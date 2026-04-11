"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const COURSES = [
    { id: 1, title: "Directional Drilling Masterclass", instructor: "Dr. Karim Bouzid", progress: 72, category: "Drilling", modules: 18, completed: 13, status: "in-progress", thumb: "⛏️" },
    { id: 2, title: "Reservoir Simulation with Eclipse", instructor: "Prof. Amina Saidi", progress: 45, category: "Reservoir", modules: 14, completed: 6, status: "in-progress", thumb: "🗺️" },
    { id: 3, title: "Process Safety Management", instructor: "Eng. Rachid Zahou", progress: 28, category: "HSE", modules: 10, completed: 3, status: "in-progress", thumb: "🦺" },
    { id: 4, title: "Well Control Fundamentals", instructor: "Dr. Karim Bouzid", progress: 12, category: "Drilling", modules: 8, completed: 1, status: "in-progress", thumb: "🔧" },
    { id: 5, title: "Production Optimization", instructor: "Eng. Samir Louafi", progress: 100, category: "Production", modules: 12, completed: 12, status: "completed", thumb: "🏭" },
    { id: 6, title: "Petroleum Economics 101", instructor: "Dr. Leyla Hamdi", progress: 100, category: "Economics", modules: 6, completed: 6, status: "completed", thumb: "📊" },
    { id: 7, title: "IWCF Well Control Level 1", instructor: "Dr. Karim Bouzid", progress: 100, category: "Drilling", modules: 8, completed: 8, status: "completed", thumb: "⛑️" },
    { id: 8, title: "HSE for Oil & Gas Operations", instructor: "Eng. Rachid Zahou", progress: 100, category: "HSE", modules: 10, completed: 10, status: "completed", thumb: "🦺" },
];

export default function StudentCoursesPage() {
    const [tab, setTab] = useState<"in-progress" | "completed">("in-progress");
    const [search, setSearch] = useState("");
    const filtered = COURSES.filter(c => c.status === tab && (!search || c.title.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2">
                    {(["in-progress", "completed"] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${tab === t ? "bg-primary text-navy-950 border-primary" : "border-slate-300 dark:border-navy-600 text-slate-500 dark:text-navy-400 hover:text-[#0D1B2A] dark:text-white"}`}>
                            {t === "in-progress" ? "In Progress" : "Completed"}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-navy-500" />
                    <input placeholder="Search courses..." className="pl-10 pr-4 h-10 bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:text-navy-500 focus:border-primary focus:outline-none w-full sm:w-64" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-4xl mb-4">📚</div>
                    <p className="text-slate-500 dark:text-navy-400">No courses found. Try a different search or tab.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((c, idx) => (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-xl flex-shrink-0">{c.thumb}</div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-[#0D1B2A] dark:text-white truncate">{c.title}</p>
                                <p className="text-xs text-slate-500 dark:text-navy-400">{c.instructor} · {c.category} · {c.modules} modules</p>
                                {c.status === "in-progress" && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-100 dark:bg-navy-800 rounded-full max-w-xs">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                                        </div>
                                        <span className="text-xs text-primary font-bold">{c.progress}%</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {c.status === "completed" && <span className="text-xs text-teal-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Done</span>}
                                <Button size="sm" variant={c.status === "in-progress" ? "primary" : "outline"} className="text-xs gap-1">
                                    {c.status === "in-progress" ? <><Play className="w-3 h-3" />Resume</> : "Review"}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
