"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, Star, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const RevenueChart = dynamic(() => import("./RevenueChart"), { ssr: false });

const STATS = [
    { label: "Total Students", value: "1,247", icon: Users, accent: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/25", change: "+12%" },
    { label: "Active Courses", value: "6", icon: BookOpen, accent: "text-primary", bg: "bg-primary/10 border-primary/25", change: "+1" },
    { label: "Total Revenue", value: "$8,430", icon: DollarSign, accent: "text-green-400", bg: "bg-green-500/10 border-green-500/25", change: "+23%" },
    { label: "Avg Rating", value: "4.8", icon: Star, accent: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/25", change: "+0.1" },
];

const RECENT_ENROLLMENTS = [
    { name: "Yacine Benouis", course: "Directional Drilling Masterclass", time: "2h ago", avatar: "YB" },
    { name: "Meriem Charef", course: "Well Control Fundamentals", time: "5h ago", avatar: "MC" },
    { name: "Sofiane Kaci", course: "Drilling Fluids Engineering", time: "8h ago", avatar: "SK" },
    { name: "Amina Djalil", course: "Directional Drilling Masterclass", time: "1d ago", avatar: "AD" },
    { name: "Rachid Boudissa", course: "Well Control Fundamentals", time: "1d ago", avatar: "RB" },
];

const COURSE_PERFORMANCE = [
    { title: "Directional Drilling Masterclass", students: 412, rating: 4.9, completion: 78, revenue: "$3,420" },
    { title: "Well Control Fundamentals", students: 289, rating: 4.8, completion: 85, revenue: "$2,100" },
    { title: "Drilling Fluids Engineering", students: 178, rating: 4.7, completion: 72, revenue: "$1,540" },
    { title: "Introduction to MWD/LWD", students: 156, rating: 4.6, completion: 68, revenue: "$890" },
    { title: "Casing Design Principles", students: 112, rating: 4.8, completion: 82, revenue: "$340" },
    { title: "Petroleum Rock Mechanics", students: 100, rating: 4.5, completion: 65, revenue: "$140" },
];

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function InstructorDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} {...fadeUp} transition={{ delay: idx * 0.08 }}
                            className={`bg-white dark:bg-navy-900 border rounded-xl p-4 ${stat.bg}`}>
                            <div className="flex items-center justify-between mb-3">
                                <Icon className={`w-5 h-5 ${stat.accent}`} />
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 font-bold">{stat.change}</span>
                            </div>
                            <p className="font-display text-2xl text-[#0D1B2A] dark:text-white font-bold">{stat.value}</p>
                            <p className="text-xs text-slate-500 dark:text-navy-400 mt-0.5">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Revenue Chart */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}
                className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white">Revenue Overview</h2>
                    <Link href="/dashboard/instructor/analytics" className="text-xs text-primary hover:underline flex items-center gap-1">Full Analytics <ArrowRight className="w-3 h-3" /></Link>
                </div>
                <RevenueChart />
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Course Performance Table */}
                <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white">Course Performance</h2>
                        <Link href="/dashboard/instructor/courses" className="text-xs text-primary hover:underline">Manage →</Link>
                    </div>
                    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-navy-700">
                                    <th className="text-left px-4 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium">Course</th>
                                    <th className="text-center px-2 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium hidden sm:table-cell">Students</th>
                                    <th className="text-center px-2 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium hidden md:table-cell">Rating</th>
                                    <th className="text-center px-2 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium">Completion</th>
                                    <th className="text-right px-4 py-3 text-xs text-slate-500 dark:text-navy-400 font-medium">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COURSE_PERFORMANCE.map((c, idx) => (
                                    <tr key={c.title} className={`border-b border-slate-100 dark:border-navy-800 hover:bg-slate-100/50 dark:hover:bg-navy-800/50 transition-colors ${idx % 2 === 1 ? 'bg-slate-50 dark:bg-navy-900/40' : ''}`}>
                                        <td className="px-4 py-3 font-medium text-[#0D1B2A] dark:text-white truncate max-w-[200px]">{c.title}</td>
                                        <td className="text-center px-2 py-3 text-slate-600 dark:text-navy-300 hidden sm:table-cell">{c.students}</td>
                                        <td className="text-center px-2 py-3 hidden md:table-cell">
                                            <span className="flex items-center justify-center gap-1 text-yellow-400"><Star className="w-3 h-3 fill-yellow-400" />{c.rating}</span>
                                        </td>
                                        <td className="text-center px-2 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-100 dark:bg-navy-800 rounded-full">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.completion}%` }} />
                                                </div>
                                                <span className="text-xs text-slate-600 dark:text-navy-300">{c.completion}%</span>
                                            </div>
                                        </td>
                                        <td className="text-right px-4 py-3 text-primary font-semibold">{c.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Enrollments */}
                <div>
                    <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Recent Enrollments</h2>
                    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl divide-y divide-slate-200 dark:divide-navy-800">
                        {RECENT_ENROLLMENTS.map((e) => (
                            <div key={e.name + e.course} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100/50 dark:hover:bg-navy-800/30 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{e.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-[#0D1B2A] dark:text-white truncate">{e.name}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-navy-400 truncate">{e.course}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 dark:text-navy-500 flex items-center gap-1 flex-shrink-0"><Clock className="w-3 h-3" />{e.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
