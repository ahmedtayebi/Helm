"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, X, ArrowUp, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeColors } from "@/lib/useThemeColors";
import { useChatLogic } from "@/lib/useChatLogic";

const SUGGESTED = [
    "ما هي معادلة ضغط القاع؟",
    "اشرح مبدأ عمل المضخات الطاردة المركزية",
    "ما هي أنواع سوائل الحفر؟",
];

function TypingIndicator() {
    return (
        <div className="flex gap-1 items-center px-1 py-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "#D4A017" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

export default function ChatBot() {
    const c = useThemeColors();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const { messages, input, setInput, isLoading, handleSend, messagesEndRef } = useChatLogic();

    const surfaceBg = c.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
    const surfaceBorder = c.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

    return (
        <>
            {/* ── Floating trigger ─────────────────────────────────────────── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        aria-label="Open HELM AI"
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold font-display"
                        style={{
                            background: "linear-gradient(135deg, #C49415 0%, #F5C518 60%, #C49415 100%)",
                            color: "#060E1A",
                            boxShadow: "0 8px 32px rgba(212,160,23,0.4), 0 2px 8px rgba(0,0,0,0.35)",
                        }}
                        initial={{ opacity: 0, y: 16, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.85 }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setIsOpen(true)}
                    >
                        <motion.span
                            animate={{ rotate: [0, 12, -12, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Sparkles size={15} />
                        </motion.span>
                        HELM AI
                        {/* pulse ring */}
                        <motion.span
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{ border: "2px solid rgba(212,160,23,0.45)" }}
                            animate={{ scale: [1, 1.18], opacity: [0.55, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Chat window ──────────────────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50 flex flex-col"
                        style={{
                            width: 400,
                            height: 580,
                            borderRadius: 24,
                            backgroundColor: c.bgCard,
                            border: `1px solid ${surfaceBorder}`,
                            boxShadow: c.isDark
                                ? "0 32px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                                : "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
                            overflow: "hidden",
                        }}
                        initial={{ opacity: 0, y: 20, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.93 }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3 shrink-0"
                            style={{ borderBottom: `1px solid ${surfaceBorder}` }}
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-display"
                                    style={{
                                        background: "linear-gradient(135deg, #C49415, #F5C518)",
                                        color: "#060E1A",
                                        boxShadow: "0 2px 8px rgba(212,160,23,0.35)",
                                    }}
                                >H</div>
                                <div>
                                    <p className={`text-[13px] font-semibold font-display leading-none ${c.heading}`}>
                                        HELM Assistant
                                    </p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span className="text-[10px] text-emerald-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <motion.button
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ color: c.textMuted }}
                                    whileHover={{ backgroundColor: surfaceBg }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => router.push("/explore/tools/ai-assistant")}
                                    title="Open full page"
                                >
                                    <ArrowUpRight size={14} />
                                </motion.button>
                                <motion.button
                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ color: c.textMuted }}
                                    whileHover={{ backgroundColor: surfaceBg }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X size={14} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {messages.length === 0 ? (
                                <motion.div
                                    className="h-full flex flex-col items-center justify-center gap-5"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-display font-bold"
                                        style={{
                                            background: "linear-gradient(135deg, #C49415, #F5C518)",
                                            color: "#060E1A",
                                            boxShadow: "0 8px 24px rgba(212,160,23,0.3)",
                                        }}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    >H</motion.div>

                                    <div className="text-center">
                                        <p className={`text-sm font-medium ${c.heading}`}>اسألني أي شيء</p>
                                        <p className={`text-xs mt-1 ${c.muted}`}>مدعوم بمراجع هندسة البترول</p>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        {SUGGESTED.map((q, i) => (
                                            <motion.button
                                                key={q}
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 + i * 0.08 }}
                                                className="w-full text-right text-xs py-2.5 px-3 rounded-xl"
                                                style={{
                                                    backgroundColor: "rgba(212,160,23,0.06)",
                                                    border: "1px solid rgba(212,160,23,0.14)",
                                                    color: c.isDark ? "rgba(212,160,23,0.88)" : "#9A7210",
                                                }}
                                                whileHover={{
                                                    backgroundColor: "rgba(212,160,23,0.12)",
                                                    borderColor: "rgba(212,160,23,0.28)",
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSend(q)}
                                            >
                                                {q}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <>
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        >
                                            {msg.role === "user" ? (
                                                <div className="flex justify-end">
                                                    <div
                                                        className="max-w-[80%] text-[13px] px-4 py-2.5 rounded-2xl rounded-tr-sm font-medium"
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
                                                <div className="flex gap-2.5 items-start">
                                                    <div
                                                        className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold font-display mt-0.5"
                                                        style={{
                                                            background: "linear-gradient(135deg, #C49415, #F5C518)",
                                                            color: "#060E1A",
                                                        }}
                                                    >H</div>
                                                    <div className="flex-1 min-w-0">
                                                        {msg.isLoading ? (
                                                            <div
                                                                className="inline-flex px-4 py-3 rounded-2xl rounded-tl-sm"
                                                                style={{
                                                                    backgroundColor: surfaceBg,
                                                                    border: `1px solid ${surfaceBorder}`,
                                                                }}
                                                            >
                                                                <TypingIndicator />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className="text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-tl-sm"
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
                                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                                        {msg.sources.map((s, i) => (
                                                                            <span
                                                                                key={i}
                                                                                className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg"
                                                                                style={{
                                                                                    backgroundColor: "rgba(212,160,23,0.08)",
                                                                                    border: "1px solid rgba(212,160,23,0.2)",
                                                                                    color: "#D4A017",
                                                                                }}
                                                                            >
                                                                                <BookOpen size={9} />
                                                                                <span className="max-w-[90px] truncate">{s.source_title}</span>
                                                                                <span className="opacity-50">·</span>
                                                                                <span>ص{s.page_number}</span>
                                                                            </span>
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

                        {/* Input */}
                        <div
                            className="px-3 pb-3 pt-2 shrink-0"
                            style={{ borderTop: `1px solid ${surfaceBorder}` }}
                        >
                            <div
                                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                                style={{
                                    backgroundColor: surfaceBg,
                                    border: `1px solid ${inputFocused ? "rgba(212,160,23,0.5)" : surfaceBorder}`,
                                    boxShadow: inputFocused ? "0 0 0 3px rgba(212,160,23,0.08)" : "none",
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                            >
                                <input
                                    dir="auto"
                                    placeholder="اكتب سؤالك..."
                                    value={input}
                                    disabled={isLoading}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                    onFocus={() => setInputFocused(true)}
                                    onBlur={() => setInputFocused(false)}
                                    className="flex-1 text-[13px] outline-none bg-transparent"
                                    style={{ color: c.text }}
                                />
                                <motion.button
                                    disabled={isLoading || !input.trim()}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                        background: isLoading || !input.trim()
                                            ? surfaceBg
                                            : "linear-gradient(135deg, #C49415, #F5C518)",
                                        color: isLoading || !input.trim() ? c.textMuted : "#060E1A",
                                        border: `1px solid ${isLoading || !input.trim() ? surfaceBorder : "transparent"}`,
                                        transition: "all 0.2s",
                                    }}
                                    whileTap={{ scale: 0.88 }}
                                    onClick={() => handleSend()}
                                >
                                    <ArrowUp size={13} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
