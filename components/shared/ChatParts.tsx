"use client";

import { motion } from "framer-motion";

// ── TypingDots ────────────────────────────────────────────────────────────────
export function TypingDots() {
    return (
        <div className="flex gap-1 items-center h-5 px-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#D4A017" }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </div>
    );
}

// ── BotAvatar ─────────────────────────────────────────────────────────────────
export function BotAvatar({ size = 24, large }: { size?: number; large?: boolean }) {
    return (
        <div
            className="rounded-full shrink-0 flex items-center justify-center font-bold"
            style={{
                width: size,
                height: size,
                backgroundColor: "#D4A017",
                color: "#060E1A",
                fontSize: large ? 18 : size <= 24 ? 10 : 12,
                fontFamily: "var(--font-display)",
            }}
        >
            H
        </div>
    );
}

// ── SuggestedQuestions ────────────────────────────────────────────────────────
const QUESTIONS = [
    "ما هي معادلة ضغط القاع؟",
    "اشرح مبدأ عمل المضخات الطاردة المركزية",
    "ما هي أنواع سوائل الحفر؟",
];

export function SuggestedQuestions({
    onSelect,
}: {
    onSelect: (q: string) => void;
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {QUESTIONS.map((q) => (
                <motion.button
                    key={q}
                    className="w-full text-xs rounded-full px-3 py-1.5 text-right"
                    style={{
                        border: "1px solid rgba(212,160,23,0.4)",
                        color: "#D4A017",
                        backgroundColor: "transparent",
                    }}
                    whileHover={{ backgroundColor: "rgba(212,160,23,0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelect(q)}
                >
                    {q}
                </motion.button>
            ))}
        </div>
    );
}
