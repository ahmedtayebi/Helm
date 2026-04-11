"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Award, Library, Clock, Play, TrendingUp, Flame, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
    { label: "Courses In Progress", value: "4", icon: BookOpen, accent: "text-primary", bg: "bg-primary/10 border-primary/25" },
    { label: "Completed", value: "12", icon: Award, accent: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/25" },
    { label: "Certificates", value: "8", icon: Award, accent: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/25" },
    { label: "Saved Books", value: "23", icon: Library, accent: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/25" },
];

const COURSES_IN_PROGRESS = [
    { id: 1, title: "Directional Drilling Masterclass", instructor: "Dr. Karim Bouzid", progress: 72, category: "Drilling", lastAccess: "2 hours ago", thumbnail: "⛏️" },
    { id: 2, title: "Reservoir Simulation with Eclipse", instructor: "Prof. Amina Saidi", progress: 45, category: "Reservoir", lastAccess: "Yesterday", thumbnail: "🗺️" },
    { id: 3, title: "Process Safety Management (PSM)", instructor: "Eng. Rachid Zahou", progress: 28, category: "HSE", lastAccess: "3 days ago", thumbnail: "🦺" },
];

const EVENTS = [
    { title: "Live Q&A: Well Control Fundamentals", date: "Mar 15, 2026", time: "14:00 CET", type: "Webinar" },
    { title: "HELM Career Fair — Spring 2026", date: "Mar 22, 2026", time: "09:00 CET", type: "Event" },
    { title: "Certificate Ceremony — Q1 Cohort", date: "Apr 1, 2026", time: "16:00 CET", type: "Ceremony" },
];

const RECENT_ACTIVITY = [
    { text: "Completed quiz: Kick Detection Methods", time: "2h ago", icon: "✅" },
    { text: "Started module: Casing Design Principles", time: "5h ago", icon: "📖" },
    { text: "Earned certificate: IWCF Fundamentals", time: "2d ago", icon: "🏆" },
    { text: "Applied to: Senior Drilling Engineer at SLB", time: "3d ago", icon: "📨" },
    { text: "Saved: Petroleum Production Engineering Handbook", time: "4d ago", icon: "📚" },
];

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div {...fadeUp} className="relative bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 blur-[60px]" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <span className="text-sm text-orange-400 font-medium">7-day streak!</span>
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl text-[#0D1B2A] dark:text-white mb-1">Welcome back, Ahmed! 🔥</h1>
                    <p className="text-slate-600 dark:text-navy-300">Keep your streak alive — You have 4 courses in progress.</p>
                </div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} {...fadeUp} transition={{ delay: idx * 0.08 }}
                            className={`bg-white dark:bg-navy-900 border rounded-xl p-4 ${stat.bg}`}>
                            <div className="flex items-center justify-between mb-3">
                                <Icon className={`w-5 h-5 ${stat.accent}`} />
                                <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                            </div>
                            <p className="font-display text-2xl text-[#0D1B2A] dark:text-white font-bold">{stat.value}</p>
                            <p className="text-xs text-slate-500 dark:text-navy-400 mt-0.5">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Continue Learning */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white">Continue Learning</h2>
                        <Link href="/dashboard/student/courses" className="text-sm text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
                    </div>
                    {COURSES_IN_PROGRESS.map((course, idx) => (
                        <motion.div key={course.id} {...fadeUp} transition={{ delay: 0.1 + idx * 0.08 }}
                            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-2xl flex-shrink-0">
                                {course.thumbnail}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#0D1B2A] dark:text-white truncate">{course.title}</p>
                                <p className="text-xs text-slate-500 dark:text-navy-400 mb-2">{course.instructor} · {course.category}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                                    </div>
                                    <span className="text-xs text-primary font-bold">{course.progress}%</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] text-slate-400 dark:text-navy-500 flex items-center gap-1"><Clock className="w-3 h-3" />{course.lastAccess}</span>
                                <Button size="sm" className="text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-3 h-3" /> Resume
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Upcoming Events */}
                    <div>
                        <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Upcoming Events</h2>
                        <div className="space-y-3">
                            {EVENTS.map((ev, idx) => (
                                <motion.div key={ev.title} {...fadeUp} transition={{ delay: 0.2 + idx * 0.08 }}
                                    className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-3 hover:border-primary/20 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-[#0D1B2A] dark:text-white truncate">{ev.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-navy-400">{ev.date} · {ev.time}</p>
                                            <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mt-1">{ev.type}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Recent Activity</h2>
                        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl divide-y divide-slate-200 dark:divide-navy-800">
                            {RECENT_ACTIVITY.map((act, idx) => (
                                <div key={idx} className="flex items-center gap-3 px-4 py-3">
                                    <span className="text-base">{act.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-600 dark:text-navy-200 truncate">{act.text}</p>
                                        <p className="text-[10px] text-slate-400 dark:text-navy-500">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
