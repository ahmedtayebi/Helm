"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ChatSource {
    source_title: string;
    pages: number[];
    resource_id?: string;
    file_url?: string | null;
    similarity?: number;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: ChatSource[];
    isLoading?: boolean;
}

// localStorage key for chat history
const HISTORY_KEY = "helm-chat-history";

export interface StoredConversation {
    id: string;
    title: string; // first user message, truncated to 30 chars
    messages: ChatMessage[];
    createdAt: number;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useChatLogic(resourceIds?: string[]) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string>(
        () => `conv-${Date.now()}`,
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ── Persist conversation to localStorage ──────────────────────────────────
    const persistConversation = useCallback(
        (msgs: ChatMessage[], convId: string) => {
            if (typeof window === "undefined") return;
            const firstUserMsg = msgs.find((m) => m.role === "user");
            if (!firstUserMsg) return;

            const map = loadStoredMap();
            map[convId] = {
                id: convId,
                title: firstUserMsg.content.slice(0, 30),
                messages: msgs,
                createdAt: map[convId]?.createdAt ?? Date.now(),
            };

            // Keep max 20 most recent
            const sorted = Object.values(map)
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 20);
            const trimmed = Object.fromEntries(sorted.map((c) => [c.id, c]));
            localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
        },
        [],
    );

    // ── Load a stored conversation ─────────────────────────────────────────────
    const loadConversation = useCallback((conv: StoredConversation) => {
        setConversationId(conv.id);
        setMessages(conv.messages);
        setInput("");
    }, []);

    // ── Start a new conversation ───────────────────────────────────────────────
    const newConversation = useCallback(() => {
        setConversationId(`conv-${Date.now()}`);
        setMessages([]);
        setInput("");
    }, []);

    // ── Delete a stored conversation ───────────────────────────────────────────
    const deleteConversation = useCallback((convId: string) => {
        if (typeof window === "undefined") return;
        const map = loadStoredMap();
        delete map[convId];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(map));
        // If deleting the active conversation, start fresh
        if (convId === conversationId) {
            setConversationId(`conv-${Date.now()}`);
            setMessages([]);
            setInput("");
        }
    }, [conversationId]);

    // ── Main send handler ─────────────────────────────────────────────────────
    const handleSend = useCallback(
        async (messageText?: string) => {
            const text = (messageText ?? input).trim();
            if (!text || isLoading) return;

            const userMsg: ChatMessage = {
                id: `user-${Date.now()}`,
                role: "user",
                content: text,
            };

            const assistantId = `assistant-${Date.now() + 1}`;
            const loadingMsg: ChatMessage = {
                id: assistantId,
                role: "assistant",
                content: "",
                isLoading: true,
            };

            const nextMessages = [...messages, userMsg, loadingMsg];
            setMessages(nextMessages);
            setInput("");
            setIsLoading(true);

            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: text,
                        resource_ids:
                            resourceIds && resourceIds.length > 0 ? resourceIds : undefined,
                    }),
                });

                const contentType = res.headers.get("Content-Type") ?? "";

                if (contentType.includes("text/event-stream")) {
                    // ── Streaming path ────────────────────────────────────────
                    const reader = res.body!.getReader();
                    const decoder = new TextDecoder();
                    let fullContent = "";
                    let finalSources: ChatSource[] = [];

                    // eslint-disable-next-line no-labels
                    outer: while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const raw = decoder.decode(value, { stream: true });

                        for (const line of raw.split("\n")) {
                            if (!line.startsWith("data: ")) continue;
                            const payload = line.slice(6).trim();
                            if (payload === "[DONE]") break outer; // eslint-disable-line no-labels

                            try {
                                const parsed = JSON.parse(payload) as {
                                    type: string;
                                    content?: string;
                                    sources?: ChatSource[];
                                };

                                if (parsed.type === "chunk" && parsed.content) {
                                    fullContent += parsed.content;
                                    setMessages((prev) =>
                                        prev.map((m) =>
                                            m.id === assistantId
                                                ? { ...m, content: fullContent, isLoading: false }
                                                : m,
                                        ),
                                    );
                                } else if (parsed.type === "sources" && parsed.sources) {
                                    finalSources = parsed.sources;
                                }
                            } catch {
                                // skip malformed SSE frame
                            }
                        }
                    }

                    setMessages((prev) => {
                        const updated = prev.map((m) =>
                            m.id === assistantId
                                ? { ...m, sources: finalSources, isLoading: false }
                                : m,
                        );
                        persistConversation(updated, conversationId);
                        return updated;
                    });
                } else {
                    // ── JSON fallback (no chunks matched) ─────────────────────
                    const data = await res.json() as {
                        answer?: string;
                        sources?: ChatSource[];
                    };

                    setMessages((prev) => {
                        const updated = prev.map((m) =>
                            m.id === assistantId
                                ? {
                                      ...m,
                                      content: data.answer ?? "",
                                      sources: data.sources ?? [],
                                      isLoading: false,
                                  }
                                : m,
                        );
                        persistConversation(updated, conversationId);
                        return updated;
                    });
                }
            } catch {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === assistantId
                            ? {
                                  ...m,
                                  content: "حدث خطأ، يرجى المحاولة مرة أخرى.",
                                  isLoading: false,
                              }
                            : m,
                    ),
                );
            } finally {
                setIsLoading(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [input, isLoading, messages, conversationId, resourceIds, persistConversation],
    );

    return {
        messages,
        input,
        setInput,
        isLoading,
        handleSend,
        messagesEndRef,
        loadConversation,
        newConversation,
        deleteConversation,
        conversationId,
    };
}

// ── Utility: load stored map (keyed by id) ───────────────────────────────────
function loadStoredMap(): Record<string, StoredConversation> {
    if (typeof window === "undefined") return {};
    try {
        const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "{}");
        // Handle legacy array format gracefully
        if (Array.isArray(raw)) {
            return Object.fromEntries((raw as StoredConversation[]).map((c) => [c.id, c]));
        }
        return raw as Record<string, StoredConversation>;
    } catch {
        return {};
    }
}

// ── Utility: load all conversations from localStorage ─────────────────────────
export function loadAllConversations(): StoredConversation[] {
    return Object.values(loadStoredMap())
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 20);
}
