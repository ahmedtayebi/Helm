"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

type Pipeline = "all" | "New" | "Screening" | "Interview" | "Offered" | "Rejected";
const PIPELINE_STYLES: Record<string, string> = {
    New: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Screening: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Interview: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    Offered: "bg-green-500/15 text-green-400 border-green-500/30",
    Rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

const APPLICANTS = [
    { id: 1, name: "Yacine Benouis", position: "Senior Drilling Engineer", experience: "8 years", match: 94, stage: "Interview", avatar: "YB" },
    { id: 2, name: "Meriem Charef", position: "Reservoir Engineering Intern", experience: "Student", match: 88, stage: "Screening", avatar: "MC" },
    { id: 3, name: "Sofiane Kaci", position: "HSE Coordinator", experience: "5 years", match: 91, stage: "Offered", avatar: "SK" },
    { id: 4, name: "Amina Djalil", position: "Senior Drilling Engineer", experience: "10 years", match: 85, stage: "New", avatar: "AD" },
    { id: 5, name: "Rachid Boudissa", position: "Senior Drilling Engineer", experience: "6 years", match: 79, stage: "Rejected", avatar: "RB" },
    { id: 6, name: "Nadia Slimani", position: "Reservoir Engineering Intern", experience: "Student", match: 82, stage: "New", avatar: "NS" },
    { id: 7, name: "Kamel Tala", position: "Production Technologist", experience: "4 years", match: 76, stage: "Screening", avatar: "KT" },
    { id: 8, name: "Lina Ait-Ahmed", position: "HSE Coordinator", experience: "3 years", match: 83, stage: "Interview", avatar: "LA" },
];

export default function CompanyApplicantsPage() {
    const [filter, setFilter] = useState<Pipeline>("all");
    const [search, setSearch] = useState("");
    const filtered = APPLICANTS.filter(a => (filter === "all" || a.stage === filter) && (!search || a.name.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                    {(["all", "New", "Screening", "Interview", "Offered", "Rejected"] as Pipeline[]).map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${filter === s ? "bg-primary text-navy-950 border-primary" : "border-slate-300 dark:border-navy-600 text-slate-500 dark:text-navy-400 hover:text-[#0D1B2A] dark:text-white"}`}>
                            {s === "all" ? "All" : s} {s !== "all" && `(${APPLICANTS.filter(a => a.stage === s).length})`}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-navy-500" />
                    <input placeholder="Search..." className="pl-10 h-9 bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:text-navy-500 focus:border-primary focus:outline-none w-48" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((a, idx) => (
                    <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{a.avatar}</div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-[#0D1B2A] dark:text-white truncate">{a.name}</p>
                            <p className="text-xs text-slate-500 dark:text-navy-400">{a.position} · {a.experience}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs font-bold text-primary">{a.match}%</span>
                            <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${PIPELINE_STYLES[a.stage]}`}>{a.stage}</span>
                        </div>
                        <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="text-xs px-2"><Eye className="w-3.5 h-3.5" /></Button>
                            <Button size="sm" variant="outline" className="text-xs px-2"><Mail className="w-3.5 h-3.5" /></Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
