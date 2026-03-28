"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ChevronRight, CheckCircle, BarChart3, Award, Users2, Zap,
    BookOpen, Shield, HeadphonesIcon, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PACKAGES = [
    {
        icon: Zap,
        name: "Quick Start",
        desc: "Essential upskilling for small teams (up to 20 engineers)",
        duration: "4–8 weeks",
        features: [
            "Choose 1 specialization track",
            "Self-paced video modules",
            "Progress tracking dashboard",
            "Team completion certificate",
        ],
        accent: "text-primary", border: "border-primary/25", color: "from-primary/15 to-primary/5",
    },
    {
        icon: Users2,
        name: "Corporate Programme",
        desc: "Structured learning journey for mid-size teams (20–200)",
        duration: "3–6 months",
        features: [
            "Multi-track curriculum design",
            "Live instructor-led webinars (2×/week)",
            "Competency gap analysis",
            "White-label certificates",
            "Dedicated L&D coordinator",
            "Monthly reporting dashboard",
        ],
        accent: "text-teal-400", border: "border-teal-500/25", color: "from-teal-500/15 to-teal-500/5",
        isPopular: true,
    },
    {
        icon: Shield,
        name: "Enterprise Academy",
        desc: "Full internal academy build for NOCs and large service companies",
        duration: "Custom",
        features: [
            "Custom LMS with your branding",
            "Unlimited engineers",
            "Bespoke content creation",
            "On-site workshop delivery",
            "API integration with your HRIS",
            "Quarterly competency audits",
            "24/7 support SLA",
        ],
        accent: "text-purple-400", border: "border-purple-500/25", color: "from-purple-500/15 to-purple-500/5",
    },
];

const BENEFITS = [
    { icon: BarChart3, title: "Real-time Analytics", desc: "Track every engineer's progress, quiz scores, and completion status from a single dashboard — exportable as PDF for your board." },
    { icon: Award, title: "Custom Certificates", desc: "Issue branded certificates with your company logo and HELM accreditation — recognised by major operators across the MENA region." },
    { icon: BookOpen, title: "Industry Content", desc: "All modules are written or reviewed by active petroleum engineers with 10–25+ years of field experience across drilling, reservoir, HSE, and LNG." },
    { icon: HeadphonesIcon, title: "L&D Coordinator", desc: "A dedicated HELM coordinator manages your programme schedule, makes content adjustments, and sends you weekly progress updates." },
];

const TRACKS = [
    { name: "Drilling & Well Engineering", modules: 18, hours: "72h", icon: "⛏️" },
    { name: "Reservoir Engineering", modules: 14, hours: "56h", icon: "🗺️" },
    { name: "Production Engineering", modules: 12, hours: "48h", icon: "🏭" },
    { name: "HSE & Process Safety", modules: 10, hours: "40h", icon: "🦺" },
    { name: "LNG & Gas Processing", modules: 8, hours: "32h", icon: "🔵" },
    { name: "Petroleum Economics", modules: 6, hours: "24h", icon: "📊" },
];

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function TrainingSolutionsPage() {
    const [form, setForm] = useState({ name: "", company: "", email: "", teamSize: "", track: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

    return (
        <main className="min-h-screen bg-navy-950 overflow-x-hidden">
            {/* ── HERO ── */}
            <section className="relative pt-28 pb-20 px-4 overflow-hidden border-b border-navy-700">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-teal-500/5 blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(45,212,191,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="flex items-center gap-2 text-sm text-navy-400 justify-center mb-8">
                        <Link href="/companies" className="hover:text-primary transition-colors">Companies</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-teal-400">Training Solutions</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <BookOpen className="w-4 h-4" /> Corporate Learning & Development
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
                        Train Your Team<br /><span className="text-teal-400">Like the Best Do</span>
                    </h1>
                    <p className="text-navy-200 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        Commission bespoke petroleum engineering training programmes for your team — from quick upskilling sprints to full internal academies. All delivered and tracked through HELM.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="#proposal"><Button size="xl" className="shadow-gold-lg px-8 font-bold">Request a Proposal</Button></a>
                        <a href="#packages"><Button size="xl" variant="outline" className="border-teal-500/40 text-teal-400 hover:bg-teal-500/10 px-8">View Packages</Button></a>
                    </div>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-12">
                        <p className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Benefits</p>
                        <h2 className="font-display text-4xl text-white">Everything your L&D team needs</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {BENEFITS.map((b, idx) => {
                            const Icon = b.icon;
                            return (
                                <motion.div key={b.title} {...fadeUp} transition={{ delay: idx * 0.1 }}
                                    className="bg-navy-900 border border-navy-600 rounded-2xl p-5 hover:border-teal-500/30 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-teal-400" />
                                    </div>
                                    <h3 className="font-display text-lg text-white mb-2">{b.title}</h3>
                                    <p className="text-sm text-navy-300 leading-relaxed">{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── COURSE TRACKS ── */}
            <section className="py-16 px-4 border-t border-navy-700 bg-navy-900/30">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-10">
                        <h2 className="font-display text-3xl text-white mb-2">Available Training Tracks</h2>
                        <p className="text-navy-400">Choose one or combine multiple tracks into a custom programme</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TRACKS.map((track, idx) => (
                            <motion.div key={track.name} {...fadeUp} transition={{ delay: idx * 0.08 }}
                                className="flex items-center gap-4 bg-navy-900 border border-navy-600 rounded-xl p-4 hover:border-teal-500/40 transition-colors">
                                <span className="text-2xl">{track.icon}</span>
                                <div>
                                    <p className="font-medium text-white text-sm">{track.name}</p>
                                    <p className="text-xs text-navy-400 mt-0.5">{track.modules} modules · {track.hours}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PACKAGES ── */}
            <section className="py-24 px-4" id="packages">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <p className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Packages</p>
                        <h2 className="font-display text-4xl text-white mb-3">Choose your scale</h2>
                        <p className="text-navy-400">All packages include content creation, progress tracking, and certification</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {PACKAGES.map((pkg, idx) => {
                            const Icon = pkg.icon;
                            return (
                                <motion.div key={pkg.name} {...fadeUp} transition={{ delay: idx * 0.1 }}
                                    className={`relative flex flex-col bg-gradient-to-b ${pkg.color} border ${pkg.border} rounded-2xl p-6 ${pkg.isPopular ? 'ring-1 ring-teal-500/40' : ''}`}>
                                    {pkg.isPopular && (
                                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full">Most Chosen</span>
                                    )}
                                    <div className={`w-12 h-12 rounded-xl bg-navy-900/70 border ${pkg.border} flex items-center justify-center mb-4`}>
                                        <Icon className={`w-6 h-6 ${pkg.accent}`} />
                                    </div>
                                    <h3 className="font-display text-2xl text-white mb-1">{pkg.name}</h3>
                                    <p className="text-navy-300 text-sm mb-1">{pkg.desc}</p>
                                    <p className={`text-sm font-medium mb-4 ${pkg.accent}`}>⏱ Timeline: {pkg.duration}</p>
                                    <ul className="space-y-2.5 mb-6 flex-1">
                                        {pkg.features.map(f => (
                                            <li key={f} className="flex items-start gap-2 text-sm text-navy-200">
                                                <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.accent}`} /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="#proposal"><Button variant="outline" className={`w-full border-current ${pkg.accent} hover:bg-white/5`}>Request Proposal</Button></a>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── PROPOSAL FORM ── */}
            <section className="py-20 px-4 border-t border-navy-700 bg-navy-900/20" id="proposal">
                <div className="max-w-2xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-10">
                        <p className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-3">Get Started</p>
                        <h2 className="font-display text-4xl text-white mb-3">Request a Proposal</h2>
                        <p className="text-navy-300">Tell us about your team and we&apos;ll send a tailored training proposal within 2 business days.</p>
                    </motion.div>

                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-navy-900 border border-teal-500/30 rounded-2xl p-10 text-center">
                            <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-teal-400" />
                            </div>
                            <h3 className="font-display text-2xl text-white mb-2">Proposal Requested!</h3>
                            <p className="text-navy-300">Our L&D team will review your requirements and send a tailored proposal within 48 hours.</p>
                        </motion.div>
                    ) : (
                        <motion.form {...fadeUp} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                            className="bg-navy-900 border border-navy-600 rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-navy-300 mb-1.5">Full Name *</label>
                                    <Input required placeholder="Your name" className="bg-navy-800 border-navy-600 focus:border-teal-500" value={form.name} onChange={e => set("name", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-navy-300 mb-1.5">Company *</label>
                                    <Input required placeholder="Company name" className="bg-navy-800 border-navy-600 focus:border-teal-500" value={form.company} onChange={e => set("company", e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-300 mb-1.5">Work Email *</label>
                                <Input required type="email" placeholder="you@company.com" className="bg-navy-800 border-navy-600 focus:border-teal-500" value={form.email} onChange={e => set("email", e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-navy-300 mb-1.5">Team Size *</label>
                                    <select required className="w-full bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors" value={form.teamSize} onChange={e => set("teamSize", e.target.value)}>
                                        <option value="">Select size</option>
                                        <option value="1–20">1–20 engineers</option>
                                        <option value="20–100">20–100 engineers</option>
                                        <option value="100–500">100–500 engineers</option>
                                        <option value="500+">500+ engineers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-navy-300 mb-1.5">Preferred Track</label>
                                    <select className="w-full bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors" value={form.track} onChange={e => set("track", e.target.value)}>
                                        <option value="">Any / Multiple</option>
                                        {TRACKS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy-300 mb-1.5">Training Goals & Context</label>
                                <textarea rows={4} placeholder="Describe your team&apos;s current level, what you want to achieve, any timeline constraints..."
                                    className="w-full bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 text-white placeholder:text-navy-500 text-sm focus:outline-none focus:border-teal-500 resize-none transition-colors"
                                    value={form.message} onChange={e => set("message", e.target.value)}
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold border-0 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                                Send Proposal Request <Send className="w-4 h-4 ml-2" />
                            </Button>
                            <p className="text-xs text-navy-500 text-center">No commitment required. We&apos;ll respond within 48 business hours.</p>
                        </motion.form>
                    )}
                </div>
            </section>
        </main>
    );
}
