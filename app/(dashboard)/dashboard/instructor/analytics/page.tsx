"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Award, Star } from "lucide-react";
import dynamic from "next/dynamic";

const EnrollmentChart = dynamic(() => import("./EnrollmentChart"), { ssr: false });
const RatingsChart = dynamic(() => import("./RatingsChart"), { ssr: false });

const METRICS = [
    { label: "Total Enrollments", value: "1,247", change: "+156 this month", icon: Users, accent: "text-teal-400" },
    { label: "Completion Rate", value: "76%", change: "+3% vs last month", icon: Award, accent: "text-primary" },
    { label: "Avg. Rating", value: "4.78", change: "from 842 reviews", icon: Star, accent: "text-yellow-400" },
    { label: "Growth Rate", value: "+23%", change: "Month over month", icon: TrendingUp, accent: "text-green-400" },
];

export default function InstructorAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {METRICS.map((m, idx) => {
                    const Icon = m.icon;
                    return (
                        <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-4">
                            <Icon className={`w-5 h-5 ${m.accent} mb-2`} />
                            <p className="font-display text-2xl text-[#0D1B2A] dark:text-white font-bold">{m.value}</p>
                            <p className="text-xs text-slate-500 dark:text-navy-400 mt-0.5">{m.change}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl p-5">
                    <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Enrollment Trends</h2>
                    <EnrollmentChart />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl p-5">
                    <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Ratings Distribution</h2>
                    <RatingsChart />
                </motion.div>
            </div>
        </div>
    );
}
