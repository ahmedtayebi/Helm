"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, X as XIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
    {
        name: "Basic",
        price: "$49",
        period: "/month",
        features: ["Post up to 3 jobs", "View 10 engineer profiles/month", "Email support", "Basic analytics"],
        missing: ["Priority placement", "Unlimited profiles", "Dedicated coordinator", "API access"],
        isActive: false,
        accent: "border-slate-300 dark:border-navy-600",
    },
    {
        name: "Professional",
        price: "$149",
        period: "/month",
        features: ["Post up to 15 jobs", "Unlimited engineer profiles", "Priority job placement", "Full analytics dashboard", "Email + Chat support"],
        missing: ["Dedicated coordinator", "API access"],
        isActive: true,
        accent: "border-primary/40 ring-1 ring-primary/20",
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: ["Unlimited jobs", "Unlimited profiles", "Priority job placement", "Full analytics", "Dedicated L&D coordinator", "API & HRIS integration", "24/7 priority support"],
        missing: [],
        isActive: false,
        accent: "border-purple-500/30",
    },
];

const USAGE = [
    { label: "Jobs Posted", used: 6, limit: 15, percent: 40 },
    { label: "Profile Views", used: 87, limit: 999, percent: 8.7 },
    { label: "Training Seats", used: 12, limit: 50, percent: 24 },
];

export default function CompanySubscriptionPage() {
    return (
        <div className="space-y-8">
            {/* Current Plan */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-primary" />
                            <span className="text-sm text-primary font-bold uppercase tracking-wider">Professional Plan</span>
                        </div>
                        <p className="text-slate-600 dark:text-navy-300 text-sm">Your plan renews on <strong className="text-[#0D1B2A] dark:text-white">April 1, 2026</strong></p>
                    </div>
                    <div className="text-right">
                        <p className="font-display text-3xl text-[#0D1B2A] dark:text-white">$149<span className="text-sm text-slate-500 dark:text-navy-400 font-normal">/month</span></p>
                        <p className="text-xs text-slate-400 dark:text-navy-500">Billed monthly</p>
                    </div>
                </div>
            </motion.div>

            {/* Usage */}
            <div>
                <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Usage This Month</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {USAGE.map((u, idx) => (
                        <motion.div key={u.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                            className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-4">
                            <p className="text-xs text-slate-500 dark:text-navy-400 mb-2">{u.label}</p>
                            <p className="font-display text-2xl text-[#0D1B2A] dark:text-white mb-2">{u.used}<span className="text-sm text-slate-400 dark:text-navy-500">/{u.limit === 999 ? "∞" : u.limit}</span></p>
                            <div className="h-1.5 bg-slate-200 dark:bg-slate-100 dark:bg-navy-800 rounded-full">
                                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(u.percent, 100)}%` }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Plans */}
            <div>
                <h2 className="font-display text-lg text-[#0D1B2A] dark:text-white mb-4">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {PLANS.map((plan, idx) => (
                        <motion.div key={plan.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.08 }}
                            className={`relative bg-white dark:bg-navy-900 border rounded-2xl p-5 flex flex-col ${plan.accent}`}>
                            {plan.isActive && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] px-3 py-0.5 rounded-full bg-primary text-navy-950 font-bold">Current Plan</span>}
                            <h3 className="font-display text-xl text-[#0D1B2A] dark:text-white mb-1">{plan.name}</h3>
                            <p className="font-display text-3xl text-[#0D1B2A] dark:text-white mb-4">{plan.price}<span className="text-sm text-slate-500 dark:text-navy-400 font-normal">{plan.period}</span></p>
                            <ul className="space-y-2 mb-4 flex-1">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600 dark:text-navy-200"><CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />{f}</li>
                                ))}
                                {plan.missing.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-slate-400 dark:text-navy-500"><XIcon className="w-3.5 h-3.5 text-slate-400 dark:text-navy-600 flex-shrink-0" />{f}</li>
                                ))}
                            </ul>
                            <Button variant={plan.isActive ? "secondary" : "primary"} size="md" className="w-full text-xs" disabled={plan.isActive}>
                                {plan.isActive ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
