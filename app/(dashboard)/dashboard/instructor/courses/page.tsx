"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit3, BarChart3, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Status = "all" | "Published" | "Draft" | "Archived";
const STATUS_STYLES: Record<string, string> = {
    Published: "bg-green-500/15 text-green-400 border-green-500/30",
    Draft: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Archived: "bg-navy-600/30 text-navy-400 border-navy-600",
};

const COURSES = [
    { id: 1, title: "Directional Drilling Masterclass", students: 412, rating: 4.9, revenue: "$3,420", status: "Published", thumb: "⛏️" },
    { id: 2, title: "Well Control Fundamentals", students: 289, rating: 4.8, revenue: "$2,100", status: "Published", thumb: "⛑️" },
    { id: 3, title: "Drilling Fluids Engineering", students: 178, rating: 4.7, revenue: "$1,540", status: "Published", thumb: "🧪" },
    { id: 4, title: "Introduction to MWD/LWD", students: 156, rating: 4.6, revenue: "$890", status: "Published", thumb: "📡" },
    { id: 5, title: "Advanced Rig Hydraulics", students: 0, rating: 0, revenue: "$0", status: "Draft", thumb: "🔧" },
    { id: 6, title: "Casing Design — Legacy", students: 98, rating: 4.3, revenue: "$210", status: "Archived", thumb: "📦" },
];

export default function InstructorCoursesPage() {
    const [tab, setTab] = useState<Status>("all");
    const [search, setSearch] = useState("");
    const filtered = COURSES.filter(c => (tab === "all" || c.status === tab) && (!search || c.title.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                    {(["all", "Published", "Draft", "Archived"] as Status[]).map(s => (
                        <button key={s} onClick={() => setTab(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${tab === s ? "bg-primary text-navy-950 border-primary" : "border-navy-600 text-navy-400 hover:text-white"}`}>
                            {s === "all" ? "All" : s}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                        <input placeholder="Search..." className="pl-10 pr-4 h-9 bg-navy-800 border border-navy-600 rounded-xl text-sm text-white placeholder:text-navy-500 focus:border-primary focus:outline-none w-48" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <Link href="/dashboard/instructor/upload">
                        <Button size="sm" className="gap-1 text-xs"><Plus className="w-3.5 h-3.5" />New Course</Button>
                    </Link>
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((c, idx) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                        className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-xl flex-shrink-0">{c.thumb}</div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-white truncate">{c.title}</p>
                            <div className="flex gap-3 text-xs text-navy-400 mt-1">
                                <span>{c.students} students</span>
                                {c.rating > 0 && <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{c.rating}</span>}
                                <span className="text-primary font-medium">{c.revenue}</span>
                            </div>
                        </div>
                        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                        <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="text-xs px-2"><Edit3 className="w-3.5 h-3.5" /></Button>
                            <Button size="sm" variant="outline" className="text-xs px-2"><BarChart3 className="w-3.5 h-3.5" /></Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
