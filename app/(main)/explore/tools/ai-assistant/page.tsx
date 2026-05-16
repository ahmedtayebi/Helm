"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Plus, MessageSquare, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { useThemeColors } from "@/lib/useThemeColors";
import {
    useChatLogic,
    loadAllConversations,
    type StoredConversation,
} from "@/lib/useChatLogic";

const SUGGESTED = [
    "ما هي معادلة ضغط القاع؟",
    "اشرح مبدأ عمل المضخات الطاردة المركزية",
    "ما هي أنواع سوائل الحفر؟",
];

function TypingIndicator() {
    return (
        <div className="flex gap-1.5 items-center py-0.5 px-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#D4A017" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.3, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

export default function AiAssistantPage() {
    const c = useThemeColors();
    const [inputFocused, setInputFocused] = useState(false);
    const [history, setHistory] = useState<StoredConversation[]>([]);

    const {
        messages, input, setInput, isLoading, handleSend,
        messagesEndRef, loadConversation, newConversation, deleteConversation, conversationId,
    } = useChatLogic();

    useEffect(() => {
        setHistory(loadAllConversations());
    }, [conversationId, messages.length]);

    const surfaceBg = c.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
    const surfaceBorder = c.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
    const dividerColor = c.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

    // Collect unique sources from all assistant messages (one per book)
    const allSources = messages
        .filter((m) => m.role === "assistant" && m.sources?.length)
        .flatMap((m) => m.sources ?? []);
    const seen = new Set<string>();
    const uniqueSources = allSources.filter((s) => {
        if (seen.has(s.source_title)) return false;
        seen.add(s.source_title);
        return true;
    });

    return (
        <div className="fixed inset-0 flex overflow-hidden" style={{ backgroundColor: c.bg, zIndex: 101 }}>

            {/* ── Left Sidebar ─────────────────────────────────────────────── */}
            <aside
                className="hidden md:flex flex-col w-64 shrink-0"
                style={{ borderRight: `1px solid ${dividerColor}` }}
            >
                {/* Brand */}
                <div className="p-5 shrink-0">
                    <div className="flex items-center gap-2.5 mb-5">
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold font-display"
                            style={{
                                background: "linear-gradient(135deg, #C49415, #F5C518)",
                                color: "#060E1A",
                                boxShadow: "0 2px 10px rgba(212,160,23,0.3)",
                            }}
                        >H</div>
                        <div>
                            <p className={`text-sm font-bold font-display leading-none ${c.heading}`}>HELM AI</p>
                            <p className={`text-[10px] mt-0.5 ${c.muted}`}>مساعد هندسة البترول</p>
                        </div>
                    </div>

                    <motion.button
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium"
                        style={{
                            backgroundColor: "rgba(212,160,23,0.08)",
                            border: "1px solid rgba(212,160,23,0.2)",
                            color: "#D4A017",
                        }}
                        whileHover={{ backgroundColor: "rgba(212,160,23,0.14)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={newConversation}
                    >
                        <Plus size={14} />
                        محادثة جديدة
                    </motion.button>
                </div>

                {/* History label */}
                <p className={`px-5 pb-2 text-[10px] font-medium tracking-widest uppercase ${c.muted}`}>
                    المحادثات
                </p>

                {/* History list */}
                <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5" style={{ scrollbarWidth: "none" }}>
                    {history.length === 0 ? (
                        <p className={`text-xs text-center py-6 ${c.muted}`}>لا توجد محادثات</p>
                    ) : (
                        history.map((conv) => {
                            const isActive = conv.id === conversationId;
                            return (
                                <div
                                    key={conv.id}
                                    className="group relative flex items-center"
                                >
                                    <motion.button
                                        className="w-full text-right text-xs px-3 py-2.5 rounded-xl flex items-center gap-2 transition-colors pr-7"
                                        style={{
                                            backgroundColor: isActive ? (c.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                                            color: isActive ? c.text : c.textMuted,
                                        }}
                                        whileHover={{ backgroundColor: c.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}
                                        onClick={() => loadConversation(conv)}
                                    >
                                        <MessageSquare size={11} className="shrink-0 opacity-40" />
                                        <span className="truncate flex-1 text-left">{conv.title}</span>
                                    </motion.button>
                                    {/* Delete button — visible on hover */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); setHistory(loadAllConversations()); }}
                                        className="absolute right-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg"
                                        style={{ color: c.muted }}
                                        title="حذف المحادثة"
                                    >
                                        <span className="text-[10px] leading-none">✕</span>
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </aside>

            {/* ── Center — Chat ────────────────────────────────────────────── */}
            <main className="flex-1 flex flex-col min-h-0">

                {/* Top bar */}
                <div
                    className="h-14 flex items-center gap-2.5 px-6 shrink-0"
                    style={{ borderBottom: `1px solid ${dividerColor}` }}
                >
                    <Sparkles size={15} style={{ color: "#D4A017" }} />
                    <span className={`text-sm font-semibold font-display ${c.heading}`}>
                        المساعد الذكي
                    </span>
                    {isLoading && (
                        <motion.span
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "rgba(212,160,23,0.12)", color: "#D4A017" }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            يفكر...
                        </motion.span>
                    )}
                </div>

                {/* Messages scroll area */}
                <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-6">
                        {messages.length === 0 ? (
                            <motion.div
                                className="flex flex-col items-center justify-center gap-8 min-h-[60vh] text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-display font-bold"
                                    style={{
                                        background: "linear-gradient(135deg, #C49415 0%, #F5C518 60%, #C49415 100%)",
                                        color: "#060E1A",
                                        boxShadow: "0 16px 48px rgba(212,160,23,0.3)",
                                    }}
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >H</motion.div>

                                <div>
                                    <h1 className={`text-2xl md:text-3xl font-display font-bold ${c.heading}`}>
                                        كيف يمكنني مساعدتك؟
                                    </h1>
                                    <p className={`text-sm mt-2 ${c.muted}`}>
                                        اسأل عن الحفر، الخزانات، الإنتاج، HSE وأكثر
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                                    {SUGGESTED.map((q, i) => (
                                        <motion.button
                                            key={q}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.12 + i * 0.1 }}
                                            className="text-right text-sm px-5 py-4 rounded-2xl flex items-center justify-between gap-3"
                                            style={{
                                                backgroundColor: surfaceBg,
                                                border: `1px solid ${surfaceBorder}`,
                                                color: c.text,
                                            }}
                                            whileHover={{
                                                backgroundColor: "rgba(212,160,23,0.06)",
                                                borderColor: "rgba(212,160,23,0.2)",
                                                x: -3,
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSend(q)}
                                        >
                                            <span>{q}</span>
                                            <ArrowUp size={14} style={{ color: "#D4A017", rotate: "45deg", flexShrink: 0 }} />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                                    >
                                        {msg.role === "user" ? (
                                            <div className="flex justify-end">
                                                <div
                                                    className="max-w-[78%] text-sm px-5 py-3.5 rounded-2xl rounded-tr-md font-medium"
                                                    style={{
                                                        background: "linear-gradient(135deg, #C49415, #D4A017)",
                                                        color: "#060E1A",
                                                        wordBreak: "break-word",
                                                    }}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-3 items-start">
                                                <div
                                                    className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold font-display mt-0.5"
                                                    style={{
                                                        background: "linear-gradient(135deg, #C49415, #F5C518)",
                                                        color: "#060E1A",
                                                        boxShadow: "0 2px 8px rgba(212,160,23,0.25)",
                                                    }}
                                                >H</div>
                                                <div className="flex-1 min-w-0 space-y-2">
                                                    {msg.isLoading ? (
                                                        <div
                                                            className="inline-flex px-5 py-4 rounded-2xl rounded-tl-md"
                                                            style={{ backgroundColor: surfaceBg, border: `1px solid ${surfaceBorder}` }}
                                                        >
                                                            <TypingIndicator />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div
                                                                className="text-sm leading-7 px-5 py-4 rounded-2xl rounded-tl-md"
                                                                style={{
                                                                    backgroundColor: surfaceBg,
                                                                    border: `1px solid ${surfaceBorder}`,
                                                                    color: c.text,
                                                                    whiteSpace: "pre-wrap",
                                                                    wordBreak: "break-word",
                                                                }}
                                                            >
                                                                {msg.content}
                                                            </div>
                                                            {msg.sources && msg.sources.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 pt-1">
                                                                    {msg.sources.map((s, i) => (
                                                                        <button
                                                                            key={i}
                                                                            disabled={!s.file_url}
                                                                            onClick={() => s.file_url && window.open(s.file_url, "_blank")}
                                                                            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-xl transition-all"
                                                                            style={{
                                                                                backgroundColor: "rgba(212,160,23,0.08)",
                                                                                border: "1px solid rgba(212,160,23,0.2)",
                                                                                color: "#D4A017",
                                                                                cursor: s.file_url ? "pointer" : "default",
                                                                            }}
                                                                            title={s.file_url ? "فتح المرجع" : s.source_title}
                                                                        >
                                                                            <BookOpen size={10} />
                                                                            <span className="max-w-[140px] truncate">{s.source_title}</span>
                                                                            <span className="opacity-40">—</span>
                                                                            <span className="shrink-0">ص {s.pages.join("، ")}</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                {/* Input bar */}
                <div
                    className="px-4 md:px-8 py-4 shrink-0"
                    style={{ borderTop: `1px solid ${dividerColor}` }}
                >
                    <div
                        className="flex items-center gap-3 max-w-2xl mx-auto px-4 py-3 rounded-2xl"
                        style={{
                            backgroundColor: surfaceBg,
                            border: `1px solid ${inputFocused ? "rgba(212,160,23,0.45)" : surfaceBorder}`,
                            boxShadow: inputFocused ? "0 0 0 4px rgba(212,160,23,0.08)" : "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                    >
                        <input
                            dir="auto"
                            placeholder="اكتب سؤالك في هندسة البترول..."
                            value={input}
                            disabled={isLoading}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            className="flex-1 text-sm outline-none bg-transparent"
                            style={{ color: c.text }}
                        />
                        <motion.button
                            disabled={isLoading || !input.trim()}
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                                background: isLoading || !input.trim()
                                    ? surfaceBg
                                    : "linear-gradient(135deg, #C49415, #F5C518)",
                                color: isLoading || !input.trim() ? c.textMuted : "#060E1A",
                                border: `1px solid ${isLoading || !input.trim() ? surfaceBorder : "transparent"}`,
                                transition: "all 0.2s",
                            }}
                            whileHover={!isLoading && input.trim() ? { scale: 1.05 } : {}}
                            whileTap={!isLoading && input.trim() ? { scale: 0.9 } : {}}
                            onClick={() => handleSend()}
                        >
                            <ArrowUp size={16} />
                        </motion.button>
                    </div>
                    <p className={`text-center text-[10px] mt-2 ${c.muted}`}>
                        الإجابات مستندة إلى المراجع المتاحة في مكتبة HELM
                    </p>
                </div>
            </main>

            {/* ── Right Panel — Sources ────────────────────────────────────── */}
            <aside
                className="hidden lg:flex flex-col w-60 shrink-0"
                style={{ borderLeft: `1px solid ${dividerColor}` }}
            >
                <div className="p-5 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen size={13} style={{ color: "#D4A017" }} />
                        <p className={`text-sm font-semibold font-display ${c.heading}`}>المصادر</p>
                    </div>
                    <p className={`text-[10px] ${c.muted}`}>المراجع المستخدمة في الإجابات</p>
                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2" style={{ scrollbarWidth: "none" }}>
                    <AnimatePresence>
                        {uniqueSources.length === 0 ? (
                            <motion.div
                                className="flex flex-col items-center gap-3 py-10 text-center px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(212,160,23,0.08)" }}
                                >
                                    <BookOpen size={16} style={{ color: "rgba(212,160,23,0.4)" }} />
                                </div>
                                <p className={`text-xs ${c.muted}`}>ستظهر المصادر بعد كل إجابة</p>
                            </motion.div>
                        ) : (
                            uniqueSources.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="p-3 rounded-xl"
                                    style={{
                                        backgroundColor: surfaceBg,
                                        border: `1px solid ${s.file_url ? "rgba(212,160,23,0.25)" : surfaceBorder}`,
                                        cursor: s.file_url ? "pointer" : "default",
                                    }}
                                    onClick={() => s.file_url && window.open(s.file_url, "_blank")}
                                    whileHover={s.file_url ? { borderColor: "rgba(212,160,23,0.4)", backgroundColor: "rgba(212,160,23,0.05)" } : {}}
                                >
                                    <p className={`text-[12px] font-semibold leading-snug ${c.heading}`}>
                                        {s.source_title}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-1 mt-1.5">
                                        {s.pages.map((p) => (
                                            <span
                                                key={p}
                                                className="text-[10px] px-1.5 py-0.5 rounded-md"
                                                style={{
                                                    backgroundColor: "rgba(212,160,23,0.1)",
                                                    color: "#D4A017",
                                                }}
                                            >
                                                ص{p}
                                            </span>
                                        ))}
                                        {s.file_url && (
                                            <span className="text-[10px] ml-auto" style={{ color: "rgba(212,160,23,0.6)" }}>↗</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </aside>
        </div>
    );
}
