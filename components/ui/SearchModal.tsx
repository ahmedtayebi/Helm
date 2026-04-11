"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Library, X, ArrowRight, Command } from "lucide-react";

/* ─── Mock search data ───────────────── */
const SEARCH_DATA = [
    { id: "c1", type: "Course", title: "Directional Drilling Masterclass", meta: "Dr. Karim Bouzid · Drilling", href: "/explore/programs/drilling/directional-drilling" },
    { id: "c2", type: "Course", title: "Reservoir Simulation with Eclipse", meta: "Prof. Amina Saidi · Reservoir", href: "/explore/programs/reservoir/eclipse-simulation" },
    { id: "c3", type: "Course", title: "Process Safety Management", meta: "Eng. Rachid Zahou · HSE", href: "/explore/programs/hse/process-safety" },
    { id: "c4", type: "Course", title: "Petroleum Economics 101", meta: "Dr. Leyla Hamdi · Economics", href: "/explore/programs/economics/economics-101" },
    { id: "c5", type: "Course", title: "Well Control Fundamentals", meta: "Dr. Karim Bouzid · Drilling", href: "/explore/programs/drilling/well-control" },
    { id: "l1", type: "Library", title: "Petroleum Production Engineering Handbook", meta: "Boyun Guo · Book", href: "/library" },
    { id: "l2", type: "Library", title: "Applied Drilling Engineering — SPE", meta: "Bourgoyne Jr. · Book", href: "/library" },
    { id: "l3", type: "Library", title: "Optimising ESP Run-Life in Algerian Fields", meta: "K. Bouzid · Paper", href: "/library" },
    { id: "p1", type: "Path", title: "Drilling Engineer Track", meta: "8 courses · 6 months", href: "/explore/learning-paths" },
    { id: "p2", type: "Path", title: "HSE Specialist Track", meta: "6 courses · 4 months", href: "/explore/learning-paths" },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
    Course: BookOpen,
    Library: Library,
    Path: ArrowRight,
};

const TYPE_COLORS: Record<string, string> = {
    Course: "text-primary bg-primary/10 border-primary/25",
    Library: "text-teal-400 bg-teal-500/10 border-teal-500/25",
    Path:    "text-purple-400 bg-purple-500/10 border-purple-500/25",
};

interface SearchModalProps { open: boolean; onClose: () => void; }

export function SearchModal({ open, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const results = query.length > 1
        ? SEARCH_DATA.filter(d =>
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.meta.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 7)
        : SEARCH_DATA.slice(0, 5);

    useEffect(() => {
        if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(""); setSelected(0); }
    }, [open]);

    useEffect(() => { setSelected(0); }, [query]);

    const handleKey = useCallback((e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === "Escape") { onClose(); return; }
        if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
        if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
        if (e.key === "Enter" && results[selected]) {
            window.location.href = results[selected].href;
            onClose();
        }
    }, [open, onClose, results, selected]);

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/20 dark:bg-navy-950/80 backdrop-blur-sm z-[150]" onClick={onClose} />
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -16 }} transition={{ type: "spring", damping: 28, stiffness: 400 }}
                        className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[160] px-4">
                        <div className="bg-white/95 dark:bg-navy-900/95 border border-slate-200 dark:border-navy-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                            {/* Input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-navy-700">
                                <Search className="w-5 h-5 text-slate-400 dark:text-navy-400 flex-shrink-0" />
                                <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                                    placeholder="Search courses, books, topics…"
                                    className="flex-1 bg-transparent text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 text-sm focus:outline-none" />
                                <div className="flex items-center gap-1.5 text-[10px] text-navy-600 hidden sm:flex">
                                    <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-navy-700 font-mono">↑↓</kbd>
                                    <span>navigate</span>
                                    <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-navy-700 font-mono">↵</kbd>
                                    <span>open</span>
                                </div>
                                <button onClick={onClose} className="text-slate-400 dark:text-navy-500 hover:text-[#0D1B2A] dark:hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto py-2">
                                {query.length > 1 && results.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-sm text-slate-400 dark:text-navy-500">
                                        No results for &ldquo;<span className="text-[#0D1B2A] dark:text-white">{query}</span>&rdquo;
                                    </div>
                                ) : (
                                    <>
                                        {!query && <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-navy-600 px-4 py-2">Suggested</p>}
                                        {results.map((item, idx) => {
                                            const Icon = TYPE_ICONS[item.type] || BookOpen;
                                            return (
                                                <a key={item.id} href={item.href} onClick={onClose}
                                                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${idx === selected ? "bg-slate-100 dark:bg-navy-800" : "hover:bg-slate-50 dark:hover:bg-navy-800/50"}`}
                                                    onMouseEnter={() => setSelected(idx)}>
                                                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[item.type]}`}>
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-[#0D1B2A] dark:text-white truncate">{item.title}</p>
                                                        <p className="text-[10px] text-slate-400 dark:text-navy-500">{item.meta}</p>
                                                    </div>
                                                    <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold uppercase hidden sm:block ${TYPE_COLORS[item.type]}`}>{item.type}</span>
                                                </a>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                            <div className="border-t border-slate-200 dark:border-navy-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-navy-600">
                                <span>HELM Academy Global Search</span>
                                <span className="flex items-center gap-1"><Command className="w-3 h-3" />K to open</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─── Hook: Ctrl+K ───────────────────── */
export function useSearchModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return { open, setOpen };
}
