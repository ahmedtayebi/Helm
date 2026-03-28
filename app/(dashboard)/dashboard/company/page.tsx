"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, UserCheck, UserPlus, Clock, ArrowRight, Eye } from "lucide-react";

const STATS = [
    { label: "Posted Jobs", value: "8", icon: Briefcase, accent: "text-primary", bg: "bg-primary/10 border-primary/25", change: "+2" },
    { label: "Total Applicants", value: "156", icon: Users, accent: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/25", change: "+34" },
    { label: "Shortlisted", value: "28", icon: UserCheck, accent: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/25", change: "+8" },
    { label: "Hired", value: "6", icon: UserPlus, accent: "text-green-400", bg: "bg-green-500/10 border-green-500/25", change: "+2" },
];

const ACTIVE_JOBS = [
    { title: "Senior Drilling Engineer", applicants: 42, views: 890, posted: "Mar 1, 2026", status: "Active" },
    { title: "Reservoir Engineering Intern", applicants: 68, views: 1240, posted: "Feb 15, 2026", status: "Active" },
    { title: "HSE Coordinator", applicants: 23, views: 560, posted: "Feb 28, 2026", status: "Active" },
    { title: "Production Technologist", applicants: 15, views: 340, posted: "Mar 5, 2026", status: "Active" },
];

const RECENT_APPLICANTS = [
    { name: "Yacine Benouis", position: "Senior Drilling Engineer", time: "1h ago", avatar: "YB", match: 94 },
    { name: "Meriem Charef", position: "Reservoir Engineering Intern", time: "3h ago", avatar: "MC", match: 88 },
    { name: "Sofiane Kaci", position: "HSE Coordinator", time: "6h ago", avatar: "SK", match: 91 },
    { name: "Amina Djalil", position: "Senior Drilling Engineer", time: "8h ago", avatar: "AD", match: 85 },
    { name: "Lina Ait-Ahmed", position: "Production Technologist", time: "1d ago", avatar: "LA", match: 79 },
];

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function CompanyDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} {...fadeUp} transition={{ delay: idx * 0.08 }}
                            className={`bg-navy-900 border rounded-xl p-4 ${stat.bg}`}>
                            <div className="flex items-center justify-between mb-3">
                                <Icon className={`w-5 h-5 ${stat.accent}`} />
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 font-bold">{stat.change}</span>
                            </div>
                            <p className="font-display text-2xl text-white font-bold">{stat.value}</p>
                            <p className="text-xs text-navy-400 mt-0.5">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Active Job Listings */}
                <div className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-lg text-white">Active Job Listings</h2>
                        <Link href="/dashboard/company/jobs" className="text-xs text-primary hover:underline flex items-center gap-1">Manage <ArrowRight className="w-3 h-3" /></Link>
                    </div>
                    <div className="space-y-3">
                        {ACTIVE_JOBS.map((job, idx) => (
                            <motion.div key={job.title} {...fadeUp} transition={{ delay: 0.1 + idx * 0.06 }}
                                className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-white truncate">{job.title}</p>
                                    <div className="flex gap-3 text-xs text-navy-400 mt-1">
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants} applicants</span>
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{job.views} views</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30 font-medium">{job.status}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent Applicants */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-lg text-white">Recent Applicants</h2>
                        <Link href="/dashboard/company/applicants" className="text-xs text-primary hover:underline">View all →</Link>
                    </div>
                    <div className="bg-navy-900 border border-navy-700 rounded-xl divide-y divide-navy-800">
                        {RECENT_APPLICANTS.map((a) => (
                            <div key={a.name + a.position} className="flex items-center gap-3 px-4 py-3 hover:bg-navy-800/30 transition-colors">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{a.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-white truncate">{a.name}</p>
                                    <p className="text-[10px] text-navy-400 truncate">{a.position}</p>
                                </div>
                                <div className="flex flex-col items-end flex-shrink-0">
                                    <span className="text-[10px] font-bold text-primary">{a.match}%</span>
                                    <span className="text-[10px] text-navy-500">{a.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
