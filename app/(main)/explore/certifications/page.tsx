"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, QrCode, Award, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
});

const CERT_TYPES = [
    { emoji: "⛏️", title: "Drilling Engineering", desc: "Well design, directional drilling, and operations", courses: 8 },
    { emoji: "🗺️", title: "Reservoir Engineering", desc: "Characterization, simulation, and forecasting", courses: 7 },
    { emoji: "🏭", title: "Production Engineering", desc: "Artificial lift, optimization, and facilities", courses: 6 },
    { emoji: "🦺", title: "HSE Specialist", desc: "Process safety, risk management, and leadership", courses: 6 },
    { emoji: "🔵", title: "LNG & Gas Processing", desc: "Liquefaction, storage, and export operations", courses: 5 },
    { emoji: "📊", title: "Petroleum Economics", desc: "Fiscal regimes, E&P finance, and investment analysis", courses: 5 },
];

const STEPS = [
    { n: "01", icon: "📚", title: "Enroll in a Track", desc: "Choose one of our 6 career tracks and work through the curated course sequence at your own pace." },
    { n: "02", icon: "✅", title: "Complete All Courses", desc: "Finish every module with a minimum passing score of 70% on all quizzes and assignments." },
    { n: "03", icon: "📝", title: "Pass the Final Exam", desc: "Take a 60-minute proctored exam covering the entire track. Pass rate is strong with our prep materials." },
    { n: "04", icon: "🏆", title: "Receive Your Certificate", desc: "Get a signed PDF certificate with a unique QR code verifiable by any employer worldwide." },
];

export default function CertificationsPage() {
    return (
        <div className="bg-navy-950 min-h-screen pt-16">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl text-white mb-4">
                        Get <span className="text-gradient-gold">Industry-Recognized</span> Certificates
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-navy-300 text-lg mb-8">
                        Earn verifiable credentials trusted by Sonatrach, TotalEnergies, SLB, and 50+ energy companies across MENA.
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 text-xs text-navy-400">
                        {["Verified via QR code", "PDF download ready", "LinkedIn shareable", "Industry recognised"].map(f => (
                            <span key={f} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-teal-400" />{f}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Certificate Preview */}
            <section className="pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()}
                        className="relative bg-[#060E1A] border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-[0_0_60px_rgba(212,160,23,0.15)]">
                        {/* Gold corner accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 mb-4">Certificate of Achievement</p>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-5 shadow-gold-sm">
                            <span className="font-display font-bold text-2xl text-navy-950">H</span>
                        </div>
                        <p className="font-display text-2xl md:text-3xl text-white mb-2">Ahmed Hadjali</p>
                        <p className="text-navy-400 text-sm mb-6">has successfully completed the</p>
                        <p className="font-display text-xl md:text-2xl text-primary mb-2">Drilling Engineering Track</p>
                        <p className="text-xs text-navy-500 mb-8">Issued by HELM Academy · March 2026 · Credential ID: HELM-DE-2026-0001</p>

                        <div className="flex items-center justify-center gap-6 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <span className="text-xs text-navy-300">Excellence in Drilling Engineering</span>
                            </div>
                            <div className="flex items-center gap-2 border border-navy-700 rounded-lg px-3 py-2">
                                <QrCode className="w-8 h-8 text-navy-500" />
                                <div className="text-left">
                                    <p className="text-[9px] text-navy-600">Scan to verify</p>
                                    <p className="text-[9px] text-navy-600">helm.academy/verify</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center mt-8">
                            <Button size="sm" className="gap-1.5 text-xs shadow-gold-sm"><Download className="w-3.5 h-3.5" />Download PDF</Button>
                            <Button size="sm" variant="outline" className="text-xs">Share on LinkedIn</Button>
                        </div>
                    </motion.div>
                    <p className="text-center text-xs text-navy-600 mt-3">Preview — your actual certificate will have your name and credential ID</p>
                </div>
            </section>

            {/* How to Earn */}
            <section className="py-20 bg-navy-900/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-white mb-3">How to Earn a Certificate</h2>
                        <p className="text-navy-400 max-w-lg mx-auto">A clear, achievable path from enrolment to verified credential.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {STEPS.map((step, idx) => (
                            <motion.div key={step.n} {...fadeUp(idx * 0.08)}
                                className="bg-navy-900 border border-navy-700 rounded-xl p-5 hover:border-primary/25 transition-colors">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl">{step.icon}</span>
                                    <span className="font-mono text-xs text-primary font-bold">{step.n}</span>
                                </div>
                                <h3 className="font-display text-base text-white mb-2">{step.title}</h3>
                                <p className="text-xs text-navy-400 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* QR Verification */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()}
                        className="bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent border border-teal-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-navy-800 border border-navy-700 flex items-center justify-center flex-shrink-0">
                            <QrCode className="w-12 h-12 text-teal-400" />
                        </div>
                        <div>
                            <h3 className="font-display text-xl text-white mb-2">Instant QR Verification</h3>
                            <p className="text-navy-300 text-sm leading-relaxed">
                                Every HELM certificate includes a unique QR code that links to a live verification page. Employers can scan it to instantly confirm your credential — name, track, issue date, exam score, and issuing instructor. <strong className="text-white">No forgery possible.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Certificate Types */}
            <section className="py-20 bg-navy-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="font-display text-3xl text-white mb-2">6 Certificate Types</h2>
                        <p className="text-navy-400">One for every major petroleum engineering discipline.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {CERT_TYPES.map((c, idx) => (
                            <motion.div key={c.title} {...fadeUp(idx * 0.07)}
                                className="bg-navy-900 border border-navy-700 rounded-xl p-5 hover:border-primary/25 transition-colors group flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-xl flex-shrink-0">{c.emoji}</div>
                                <div>
                                    <p className="font-semibold text-sm text-white mb-1">{c.title}</p>
                                    <p className="text-xs text-navy-400 mb-2">{c.desc}</p>
                                    <span className="text-[10px] text-primary">{c.courses} courses required</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div {...fadeUp(0.3)} className="text-center mt-10">
                        <Button className="shadow-gold-sm gap-2 font-bold"><Award className="w-4 h-4" />Explore Learning Paths</Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
