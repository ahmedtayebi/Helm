"use client";
import React, { useState } from "react";
import { Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const STUDENTS = [
    { id: 1, name: "Yacine Benouis", email: "yacine.b@email.com", course: "Directional Drilling Masterclass", progress: 85, enrolled: "Jan 12, 2026", avatar: "YB" },
    { id: 2, name: "Meriem Charef", email: "meriem.c@email.com", course: "Well Control Fundamentals", progress: 62, enrolled: "Feb 3, 2026", avatar: "MC" },
    { id: 3, name: "Sofiane Kaci", email: "sofiane.k@email.com", course: "Drilling Fluids Engineering", progress: 91, enrolled: "Dec 15, 2025", avatar: "SK" },
    { id: 4, name: "Amina Djalil", email: "amina.d@email.com", course: "Directional Drilling Masterclass", progress: 45, enrolled: "Feb 18, 2026", avatar: "AD" },
    { id: 5, name: "Rachid Boudissa", email: "rachid.b@email.com", course: "Well Control Fundamentals", progress: 100, enrolled: "Nov 5, 2025", avatar: "RB" },
    { id: 6, name: "Nadia Slimani", email: "nadia.s@email.com", course: "Introduction to MWD/LWD", progress: 33, enrolled: "Mar 1, 2026", avatar: "NS" },
    { id: 7, name: "Kamel Tala", email: "kamel.t@email.com", course: "Directional Drilling Masterclass", progress: 72, enrolled: "Jan 28, 2026", avatar: "KT" },
    { id: 8, name: "Lina Ait-Ahmed", email: "lina.a@email.com", course: "Drilling Fluids Engineering", progress: 58, enrolled: "Feb 10, 2026", avatar: "LA" },
];

export default function InstructorStudentsPage() {
    const [search, setSearch] = useState("");
    const filtered = STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-navy-500" />
                <input placeholder="Search by name or course..." className="pl-10 h-10 w-full bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:text-navy-500 focus:border-primary focus:outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-navy-700">
                            <th className="text-left px-4 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium">Student</th>
                            <th className="text-left px-4 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium hidden md:table-cell">Course</th>
                            <th className="text-center px-2 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium">Progress</th>
                            <th className="text-right px-4 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium hidden sm:table-cell">Enrolled</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s, idx) => (
                            <tr key={s.id} className={`border-b border-slate-100 dark:border-navy-800 hover:bg-slate-100/50 dark:hover:bg-navy-800/30 transition-colors ${idx % 2 === 1 ? 'bg-slate-50 dark:bg-navy-900/40' : ''}`}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">{s.avatar}</div>
                                        <div>
                                            <p className="font-medium text-[#0D1B2A] dark:text-white text-sm">{s.name}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-navy-500">{s.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-slate-600 dark:text-navy-300 text-xs hidden md:table-cell">{s.course}</td>
                                <td className="px-2 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-100 dark:bg-navy-800 rounded-full">
                                            <div className={`h-full rounded-full ${s.progress === 100 ? 'bg-teal-400' : 'bg-primary'}`} style={{ width: `${s.progress}%` }} />
                                        </div>
                                        <span className="text-xs text-slate-600 dark:text-navy-300 w-8">{s.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-xs text-slate-500 dark:text-navy-400 text-right hidden sm:table-cell">{s.enrolled}</td>
                                <td className="px-4 py-3">
                                    <Button size="sm" variant="outline" className="text-xs px-2"><Mail className="w-3 h-3" /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
