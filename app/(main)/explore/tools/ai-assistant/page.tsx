"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowUp,
    BookOpen,
    ChevronDown,
    Menu,
    MessageSquare,
    MoreHorizontal,
    PanelLeftClose,
    PanelLeftOpen,
    PenLine,
    Plus,
    Search,
    Sparkles,
    Trash2,
    X,
} from "lucide-react";
import {
    loadAllConversations,
    type StoredConversation,
    useChatLogic,
} from "@/lib/useChatLogic";
import { useThemeColors } from "@/lib/useThemeColors";

const SUGGESTED = [
    "Explain bottom-hole pressure in simple terms",
    "ما هي أنواع سوائل الحفر؟",
    "Compare ESP and gas lift for mature wells",
    "Build a study plan for reservoir simulation",
];

function getChatPalette(isDark: boolean) {
    return {
        isDark,
        page: isDark ? "#060E1A" : "#F5F7FA",
        sidebar: isDark ? "#0A1628" : "#E8EDF5",
        raised: isDark ? "#132238" : "#FFFFFF",
        card: isDark ? "rgba(19, 34, 56, 0.74)" : "rgba(255, 255, 255, 0.82)",
        field: isDark ? "rgba(19, 34, 56, 0.72)" : "rgba(255, 255, 255, 0.74)",
        header: isDark ? "rgba(6, 14, 26, 0.86)" : "rgba(245, 247, 250, 0.9)",
        active: isDark ? "rgba(212, 160, 23, 0.12)" : "rgba(212, 160, 23, 0.16)",
        line: isDark ? "rgba(212, 160, 23, 0.14)" : "rgba(10, 22, 40, 0.12)",
        lineStrong: isDark ? "rgba(212, 160, 23, 0.28)" : "rgba(10, 22, 40, 0.18)",
        text: isDark ? "#E8EDF5" : "#0D1B2A",
        muted: isDark ? "#A8B8D0" : "#4A6080",
        faint: isDark ? "#6B7FA3" : "#8A9BBC",
        accent: "#D4A017",
        accentDark: isDark ? "#F5C518" : "#A07810",
        accentSoft: isDark ? "rgba(212, 160, 23, 0.14)" : "rgba(212, 160, 23, 0.12)",
        goldGlow: isDark ? "rgba(212, 160, 23, 0.24)" : "rgba(212, 160, 23, 0.18)",
        overlay: isDark ? "bg-black/55" : "bg-navy-950/25",
        hover: isDark ? "hover:bg-white/[0.06]" : "hover:bg-navy-900/[0.06]",
        hoverStrong: isDark ? "hover:bg-white/[0.08]" : "hover:bg-navy-900/[0.08]",
        bottomFade: isDark
            ? "linear-gradient(to top, #060E1A 72%, rgba(6,14,26,0))"
            : "linear-gradient(to top, #F5F7FA 72%, rgba(245,247,250,0))",
        composerShadow: isDark
            ? "0 18px 44px rgba(0,0,0,0.24)"
            : "0 18px 44px rgba(10,22,40,0.10)",
        composerShadowFocus: isDark
            ? "0 0 0 4px rgba(212,160,23,0.24), 0 18px 44px rgba(0,0,0,0.32)"
            : "0 0 0 4px rgba(212,160,23,0.16), 0 18px 44px rgba(10,22,40,0.14)",
        disabledSendBg: isDark ? "rgba(212,160,23,0.12)" : "rgba(10,22,40,0.06)",
    };
}

type ChatPalette = ReturnType<typeof getChatPalette>;

function TypingIndicator({ palette }: { palette: ChatPalette }) {
    return (
        <div className="flex items-center gap-1.5 py-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                    animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.14,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

function ConversationTitle({ title }: { title: string }) {
    return <span className="min-w-0 truncate text-left">{title || "New conversation"}</span>;
}

export default function AiAssistantPage() {
    const theme = useThemeColors();
    const [history, setHistory] = useState<StoredConversation[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const {
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
    } = useChatLogic();

    useEffect(() => {
        setHistory(loadAllConversations());
    }, [conversationId, messages.length]);

    const activeConversation = useMemo(
        () => history.find((conv) => conv.id === conversationId),
        [conversationId, history],
    );
    const palette = useMemo(() => getChatPalette(theme.isDark), [theme.isDark]);

    const hasMessages = messages.length > 0;

    const startNewConversation = () => {
        newConversation();
        setMobileSidebarOpen(false);
        setHistory(loadAllConversations());
    };

    const selectConversation = (conv: StoredConversation) => {
        loadConversation(conv);
        setMobileSidebarOpen(false);
    };

    const removeConversation = (id: string) => {
        deleteConversation(id);
        setHistory(loadAllConversations());
    };

    const submitMessage = (messageText?: string) => {
        const text = (messageText ?? input).trim();
        if (!text || isLoading) return;
        void handleSend(text);
    };

    const sidebar = (
        <aside
            className="flex h-full w-[280px] shrink-0 flex-col border-r"
            style={{ backgroundColor: palette.sidebar, borderColor: palette.line }}
        >
            <div className="flex h-14 items-center gap-2 px-3">
                <button
                    type="button"
                    onClick={startNewConversation}
                    className={`flex h-9 flex-1 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${palette.hover}`}
                    style={{ color: palette.text }}
                >
                    <PenLine size={16} />
                    New chat
                </button>
                <button
                    type="button"
                    className={`hidden h-9 w-9 items-center justify-center rounded-lg transition-colors lg:flex ${palette.hover}`}
                    style={{ color: palette.muted }}
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Hide sidebar"
                >
                    <PanelLeftClose size={18} />
                </button>
                <button
                    type="button"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors lg:hidden ${palette.hover}`}
                    style={{ color: palette.muted }}
                    onClick={() => setMobileSidebarOpen(false)}
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="px-3 pb-3">
                <div
                    className="flex h-9 items-center gap-2 rounded-lg border px-3"
                    style={{ borderColor: palette.line, backgroundColor: palette.field }}
                >
                    <Search size={15} style={{ color: palette.faint }} />
                    <span className="text-sm" style={{ color: palette.faint }}>
                        Search chats
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4" style={{ scrollbarWidth: "thin" }}>
                <div className="px-2 pb-2 pt-1 text-xs font-medium" style={{ color: palette.faint }}>
                    Recents
                </div>

                {history.length === 0 ? (
                    <div className="px-3 py-8 text-center text-sm" style={{ color: palette.muted }}>
                        No conversations yet
                    </div>
                ) : (
                    <div className="space-y-1">
                        {history.map((conv) => {
                            const isActive = conv.id === conversationId;

                            return (
                                <div key={conv.id} className="group relative">
                                    <button
                                        type="button"
                                        onClick={() => selectConversation(conv)}
                                        className="flex h-10 w-full items-center gap-2 rounded-lg px-3 pr-9 text-sm transition-colors"
                                        style={{
                                            backgroundColor: isActive ? palette.active : "transparent",
                                            color: isActive ? palette.text : palette.muted,
                                        }}
                                    >
                                        <MessageSquare size={15} className="shrink-0 opacity-65" />
                                        <ConversationTitle title={conv.title} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            removeConversation(conv.id);
                                        }}
                                        className={`absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100 ${palette.hoverStrong}`}
                                        style={{ color: palette.faint }}
                                        aria-label="Delete conversation"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="border-t p-3" style={{ borderColor: palette.line }}>
                <button
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${palette.hover}`}
                >
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold"
                        style={{ backgroundColor: palette.accentSoft, color: palette.accentDark }}
                    >
                        H
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium" style={{ color: palette.text }}>
                            HELM AI
                        </p>
                        <p className="truncate text-xs" style={{ color: palette.muted }}>
                            Petroleum tutor
                        </p>
                    </div>
                    <MoreHorizontal size={16} style={{ color: palette.faint }} />
                </button>
            </div>
        </aside>
    );

    return (
        <div
            className="fixed inset-0 z-[101] flex overflow-hidden font-body"
            style={{ backgroundColor: palette.page, color: palette.text }}
        >
            {sidebarOpen && <div className="hidden lg:block">{sidebar}</div>}

            <AnimatePresence>
                {mobileSidebarOpen && (
                    <>
                        <motion.button
                            type="button"
                            className={`fixed inset-0 z-40 backdrop-blur-[2px] lg:hidden ${palette.overlay}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileSidebarOpen(false)}
                            aria-label="Close sidebar overlay"
                        />
                        <motion.div
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 28, stiffness: 260 }}
                        >
                            {sidebar}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="flex min-w-0 flex-1 flex-col">
                <header
                    className="flex h-14 shrink-0 items-center justify-between border-b px-3 sm:px-5"
                    style={{ borderColor: palette.line, backgroundColor: palette.header }}
                >
                    <div className="flex min-w-0 items-center gap-2">
                        <button
                            type="button"
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors lg:hidden ${palette.hover}`}
                            style={{ color: palette.muted }}
                            onClick={() => setMobileSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <Menu size={19} />
                        </button>
                        {!sidebarOpen && (
                            <button
                                type="button"
                                className={`hidden h-9 w-9 items-center justify-center rounded-lg transition-colors lg:flex ${palette.hover}`}
                                style={{ color: palette.muted }}
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Show sidebar"
                            >
                                <PanelLeftOpen size={18} />
                            </button>
                        )}

                        <button
                            type="button"
                            className={`flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${palette.hover}`}
                            style={{ color: palette.text }}
                        >
                            <span className="truncate">
                                {activeConversation?.title || "HELM Assistant"}
                            </span>
                            <ChevronDown size={15} style={{ color: palette.faint }} />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={startNewConversation}
                        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors ${palette.hover}`}
                        style={{ borderColor: palette.line, color: palette.text }}
                    >
                        <Plus size={16} />
                        <span className="hidden sm:inline">New chat</span>
                    </button>
                </header>

                <section className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 pb-8 pt-8 sm:px-6 lg:px-8">
                            {!hasMessages ? (
                                <motion.div
                                    className="flex flex-1 flex-col items-center justify-center pb-20 text-center"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <div
                                        className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold shadow-sm"
                                        style={{
                                            backgroundColor: palette.raised,
                                            color: palette.accentDark,
                                            border: `1px solid ${palette.line}`,
                                        }}
                                    >
                                        H
                                    </div>
                                    <h1
                                        className="mb-7 text-3xl font-medium tracking-normal sm:text-4xl"
                                        style={{ color: palette.text }}
                                    >
                                        How can I help you today?
                                    </h1>

                                    <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
                                        {SUGGESTED.map((question, index) => (
                                            <motion.button
                                                key={question}
                                                type="button"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => submitMessage(question)}
                                                className="min-h-[64px] rounded-xl border px-4 py-3 text-left text-sm leading-5 transition-colors hover:border-primary/60 hover:bg-primary/10"
                                                style={{
                                                    backgroundColor: palette.card,
                                                    borderColor: palette.line,
                                                    color: palette.text,
                                                }}
                                            >
                                                {question}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-8 pt-2">
                                    {messages.map((msg) => (
                                        <motion.article
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22 }}
                                            className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
                                        >
                                            {msg.role === "user" ? (
                                                <div
                                                    className="max-w-[86%] whitespace-pre-wrap rounded-3xl px-5 py-3 text-[15px] leading-7 shadow-sm sm:max-w-[76%]"
                                                    style={{
                                                        backgroundColor: palette.raised,
                                                        border: `1px solid ${palette.line}`,
                                                        color: palette.text,
                                                    }}
                                                >
                                                    {msg.content}
                                                </div>
                                            ) : (
                                                <div className="flex w-full max-w-none gap-4">
                                                    <div
                                                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
                                                        style={{
                                                            backgroundColor: palette.accentSoft,
                                                            color: palette.accentDark,
                                                        }}
                                                    >
                                                        H
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        {msg.isLoading ? (
                                                            <div className="pt-2">
                                                                <TypingIndicator palette={palette} />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className="whitespace-pre-wrap text-[15px] leading-8"
                                                                    style={{ color: palette.text }}
                                                                >
                                                                    {msg.content}
                                                                </div>

                                                                {msg.sources && msg.sources.length > 0 && (
                                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                                        {msg.sources.map((source, index) => (
                                                                            <button
                                                                                key={`${source.source_title}-${index}`}
                                                                                type="button"
                                                                                disabled={!source.file_url}
                                                                                onClick={() => source.file_url && window.open(source.file_url, "_blank")}
                                                                                className="inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-primary/10 disabled:cursor-default"
                                                                                style={{
                                                                                    borderColor: palette.lineStrong,
                                                                                    color: palette.muted,
                                                                                    backgroundColor: palette.card,
                                                                                }}
                                                                                title={source.file_url ? "Open source" : source.source_title}
                                                                            >
                                                                                <BookOpen size={13} className="shrink-0" />
                                                                                <span className="max-w-[180px] truncate">
                                                                                    {source.source_title}
                                                                                </span>
                                                                                <span style={{ color: palette.faint }}>
                                                                                    p. {source.pages.join(", ")}
                                                                                </span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.article>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="shrink-0 px-3 pb-5 pt-3 sm:px-6"
                        style={{
                            background: palette.bottomFade,
                        }}
                    >
                        <div className="mx-auto max-w-3xl">
                            <div
                                className="rounded-3xl border shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition-shadow"
                                style={{
                                    backgroundColor: palette.raised,
                                    borderColor: inputFocused ? palette.accent : palette.lineStrong,
                                    boxShadow: inputFocused
                                        ? palette.composerShadowFocus
                                        : palette.composerShadow,
                                }}
                            >
                                <textarea
                                    dir="auto"
                                    value={input}
                                    disabled={isLoading}
                                    onChange={(event) => setInput(event.target.value)}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" && !event.shiftKey) {
                                            event.preventDefault();
                                            submitMessage();
                                        }
                                    }}
                                    rows={1}
                                    placeholder="Ask anything"
                                    className="max-h-40 min-h-[64px] w-full resize-none bg-transparent px-5 pb-2 pt-4 text-[15px] leading-7 outline-none"
                                    style={{ color: palette.text }}
                                />

                                <div className="flex items-center justify-between px-3 pb-3">
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                                            style={{ color: palette.muted }}
                                        >
                                            <Sparkles size={14} />
                                            HELM
                                        </button>
                                        <button
                                            type="button"
                                            className="flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors hover:bg-primary/10 hover:text-primary"
                                            style={{ color: palette.muted }}
                                        >
                                            <BookOpen size={14} />
                                            Sources
                                        </button>
                                    </div>

                                    <motion.button
                                        type="button"
                                        disabled={isLoading || !input.trim()}
                                        onClick={() => submitMessage()}
                                        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:opacity-45"
                                        style={{
                                            backgroundColor: input.trim() && !isLoading ? palette.accent : palette.disabledSendBg,
                                            color: input.trim() && !isLoading ? "#060E1A" : palette.faint,
                                        }}
                                        whileTap={input.trim() && !isLoading ? { scale: 0.92 } : undefined}
                                        aria-label="Send message"
                                    >
                                        <ArrowUp size={17} />
                                    </motion.button>
                                </div>
                            </div>

                            <p className="mt-2 text-center text-[11px]" style={{ color: palette.faint }}>
                                HELM can make mistakes. Check important petroleum calculations.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
