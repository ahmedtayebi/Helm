"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Star, Lightbulb, ShieldCheck, Building2, Globe, Users2,
    Mail, Phone, MapPin, Linkedin, Send, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
});

/* ─── Values ────────────────────────────────── */
const VALUES = [
    { icon: Star, label: "Excellence", desc: "We hold ourselves to the highest academic and professional standards in every course and resource we publish." },
    { icon: Lightbulb, label: "Innovation", desc: "We embrace new technologies—AI tutors, interactive simulations, and live labs—to make learning more engaging." },
    { icon: ShieldCheck, label: "Integrity", desc: "Honest assessments, transparent pricing, and content created only by verified industry practitioners." },
    { icon: Building2, label: "Industry Focus", desc: "Every course maps directly to real job skills. Theory is always paired with field-tested applications." },
    { icon: Globe, label: "Accessibility", desc: "Arabic, French and English content; mobile-first design; and tiered pricing for students across MENA." },
    { icon: Users2, label: "Community", desc: "A thriving network of 12,000+ engineers sharing knowledge, mentoring peers, and opening doors." },
];

/* ─── Advisory Board ────────────────────────── */
const BOARD = [
    { name: "Dr. Rachid Meftah", title: "Former VP Exploration & Production", company: "Sonatrach", initials: "RM", spec: "Reservoir Engineering" },
    { name: "Dr. Nadia Bensid", title: "Professor of Petroleum Engineering", company: "USTHB, Algiers", initials: "NB", spec: "Drilling & Well Engineering" },
    { name: "Eng. Omar Hadjeres", title: "Regional HSE Director", company: "TotalEnergies Africa", initials: "OH", spec: "HSE Management" },
    { name: "Dr. Lila Kherroub", title: "Head of LNG Operations", company: "Repsol Algeria", initials: "LK", spec: "LNG & Gas Processing" },
];

/* ─── Contact form ──────────────────────────── */
function ContactSection() {
    const [state, setState] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const inputCls = "w-full bg-navy-800/80 border border-navy-600 rounded-xl px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:border-primary focus:outline-none transition-colors";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
        setSent(true);
    };

    return (
        <section className="py-20 bg-navy-950/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div {...fadeUp()} className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Get In Touch</h2>
                    <p className="text-navy-300 max-w-xl mx-auto">Have a question, partnership idea, or press inquiry? We&apos;d love to hear from you.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Info */}
                    <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
                        {[
                            { icon: Mail, label: "Email", val: "hello@helm.academy" },
                            { icon: Phone, label: "Phone", val: "+213 (0) 23 45 67 89" },
                            { icon: MapPin, label: "Location", val: "Algiers, Algeria (Remote-first team)" },
                        ].map(item => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-navy-500 mb-0.5">{item.label}</p>
                                        <p className="text-sm text-navy-200">{item.val}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="mt-6 p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl text-sm text-navy-300">
                            🇩🇿 We&apos;re a <strong className="text-white">remote-first Algerian team</strong> with collaborators across the Maghreb and Gulf. Response time: within 24 business hours.
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div {...fadeUp(0.15)} className="lg:col-span-3">
                        {sent ? (
                            <div className="bg-navy-900 border border-teal-500/20 rounded-2xl p-10 text-center">
                                <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500 flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-7 h-7 text-teal-400" />
                                </div>
                                <h3 className="font-display text-2xl text-white mb-2">Message Sent!</h3>
                                <p className="text-navy-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-navy-900 border border-navy-700 rounded-2xl p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-navy-400 mb-1.5">Full Name *</label>
                                        <input required className={inputCls} placeholder="Ahmed Benali" value={state.name} onChange={e => setState(p => ({ ...p, name: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-navy-400 mb-1.5">Email *</label>
                                        <input required type="email" className={inputCls} placeholder="ahmed@email.com" value={state.email} onChange={e => setState(p => ({ ...p, email: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-navy-400 mb-1.5">Subject</label>
                                    <input className={inputCls} placeholder="Partnership / General Inquiry / Press" value={state.subject} onChange={e => setState(p => ({ ...p, subject: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-xs text-navy-400 mb-1.5">Message *</label>
                                    <textarea required rows={5} className={inputCls + " resize-none"} placeholder="Tell us how we can help..." value={state.message} onChange={e => setState(p => ({ ...p, message: e.target.value }))} />
                                </div>
                                <Button type="submit" className="w-full shadow-gold-sm font-bold" disabled={loading}>
                                    {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending…</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Page ──────────────────────────────────── */
export default function AboutPage() {
    return (
        <div className="bg-navy-950 min-h-screen pt-16">
            {/* Hero */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-teal-500/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                {/* Floating orbs */}
                <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
                <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full bg-teal-500/5 blur-[60px] pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-block text-xs font-bold uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
                        Our Story
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-4xl md:text-6xl text-white leading-tight mb-6">
                        Powering the Next Generation of
                        <span className="block text-gradient-gold">Petroleum Engineers</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-navy-300 max-w-2xl mx-auto">
                        HELM Academy was born from a simple observation: world-class petroleum engineering education was too expensive, too English-centric, and too distant from the realities of the MENA energy sector.
                    </motion.p>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeUp()}>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Who We Are</span>
                            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-snug">Built by engineers, for engineers</h2>
                            <div className="space-y-4 text-navy-300 leading-relaxed">
                                <p>Founded in 2023 by a team of petroleum engineers and edtech veterans, HELM Academy is Algeria&apos;s first dedicated petroleum engineering learning platform — and the largest Arabic-language petroleum curriculum in the world.</p>
                                <p>Our instructors are active professionals: drilling engineers who just came off a rig, reservoir scientists who published last quarter, HSE leaders who have managed million-barrel operations. They don&apos;t teach from textbooks — they teach from experience.</p>
                                <p>We&apos;re backed by a community of <strong className="text-white">12,000+ engineers</strong> across Algeria, Morocco, Libya, Saudi Arabia, Qatar, and the UAE — all united by the goal of building a stronger, more skilled MENA energy workforce.</p>
                            </div>
                        </motion.div>
                        <motion.div {...fadeUp(0.15)} className="relative">
                            <div className="relative bg-navy-900 border border-navy-700 rounded-2xl p-8 overflow-hidden">
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { n: "2023", l: "Founded", sub: "in Algiers" },
                                        { n: "12K+", l: "Engineers", sub: "across MENA" },
                                        { n: "500+", l: "Courses", sub: "and growing" },
                                        { n: "50+", l: "Companies", sub: "trust HELM" },
                                    ].map(s => (
                                        <div key={s.l} className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 text-center">
                                            <p className="font-display text-2xl text-primary font-bold">{s.n}</p>
                                            <p className="text-sm text-white font-medium">{s.l}</p>
                                            <p className="text-xs text-navy-500">{s.sub}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-xs text-navy-500 mt-6">🇩🇿 Proudly founded in Algeria · Remote-first team</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-navy-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-white">Mission &amp; Vision</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: "🎯", badge: "Mission", title: "Democratize Petroleum Engineering Education", desc: "To make industry-grade petroleum engineering training accessible, affordable, and available in Arabic to every aspiring engineer across the MENA region — removing geographic and financial barriers to career growth." },
                            { icon: "🔭", badge: "Vision", title: "Become the Global Hub for Energy Talent", desc: "To be recognized as the world&apos;s leading platform for petroleum engineering education and career development — the place where the next generation of energy leaders are discovered, trained, and hired." },
                        ].map((card, idx) => (
                            <motion.div key={card.badge} {...fadeUp(idx * 0.1)}
                                className="relative bg-navy-900 border border-navy-700 rounded-2xl p-8 overflow-hidden group hover:border-primary/30 transition-colors">
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                                <div className="text-3xl mb-4">{card.icon}</div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 rounded bg-primary/10 mb-3 inline-block">{card.badge}</span>
                                <h3 className="font-display text-xl text-white mb-3">{card.title}</h3>
                                <p className="text-sm text-navy-300 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Our Values</h2>
                        <p className="text-navy-400 max-w-lg mx-auto">Six principles that guide every decision we make — from course design to company culture.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {VALUES.map((v, idx) => {
                            const Icon = v.icon;
                            return (
                                <motion.div key={v.label} {...fadeUp(idx * 0.07)}
                                    className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-primary/30 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-display text-lg text-white mb-2">{v.label}</h3>
                                    <p className="text-sm text-navy-400 leading-relaxed">{v.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="py-20 bg-navy-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Advisory Board</h2>
                        <p className="text-navy-400 max-w-lg mx-auto">Industry veterans who ensure our curriculum stays rigorous, current, and relevant.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {BOARD.map((member, idx) => (
                            <motion.div key={member.name} {...fadeUp(idx * 0.08)}
                                className="bg-navy-900 border border-navy-700 rounded-2xl p-5 text-center hover:border-primary/30 transition-colors group">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center font-display text-xl font-bold text-primary mx-auto mb-4">
                                    {member.initials}
                                </div>
                                <h3 className="font-display text-base text-white mb-0.5">{member.name}</h3>
                                <p className="text-xs text-primary font-medium mb-1">{member.title}</p>
                                <p className="text-xs text-navy-500 mb-3">{member.company}</p>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-800 text-navy-400 border border-navy-700">{member.spec}</span>
                                <div className="mt-4">
                                    <a href="#" className="inline-flex items-center gap-1 text-xs text-navy-500 hover:text-primary transition-colors">
                                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactSection />
        </div>
    );
}
