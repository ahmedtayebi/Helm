"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Edit3, Download, CheckCircle, Zap, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
    {
        icon: Layers,
        step: "01",
        title: "Choose Template",
        description: "Pick from 3 petroleum-engineering–focused professional CV templates, optimised for ATS screening at top oil & gas companies.",
        color: "from-primary/20 to-primary/5",
        accent: "text-primary",
        border: "border-primary/30",
    },
    {
        icon: Edit3,
        step: "02",
        title: "Fill Your Details",
        description: "Our smart form guides you through every section: personal info, education, experience, certifications, and key technical skills.",
        color: "from-teal-500/20 to-teal-500/5",
        accent: "text-teal-400",
        border: "border-teal-500/30",
    },
    {
        icon: Download,
        step: "03",
        title: "Download PDF",
        description: "Instantly export your professional, print-ready PDF. Share via link or attach directly to job applications.",
        color: "from-purple-500/20 to-purple-500/5",
        accent: "text-purple-400",
        border: "border-purple-500/30",
    },
];

const TEMPLATES = [
    {
        id: "t_01",
        name: "Executive",
        tagline: "For Senior Engineers & Managers",
        color: "from-[#1a2e4a] to-[#0a1628]",
        accent: "#D4A017",
        preview: "Clean two-column layout. Gold accents. Suited for 10+ years experience.",
        features: ["Executive summary block", "Impact-focused bullet points", "Skills matrix table"],
    },
    {
        id: "t_02",
        name: "Standard",
        tagline: "For Mid-level Professionals",
        color: "from-[#1a3a3a] to-[#0a1628]",
        accent: "#2DD4BF",
        preview: "Modern single-column layout with teal accents. Clear and readable.",
        features: ["Chronological experience", "Project highlights section", "Certification badges"],
        isPopular: true,
    },
    {
        id: "t_03",
        name: "Graduate",
        tagline: "For Students & Fresh Graduates",
        color: "from-[#2a1a4a] to-[#0a1628]",
        accent: "#a78bfa",
        preview: "Skills-first layout that highlights academic projects and internships.",
        features: ["Academic achievements first", "Project portfolio section", "Skills by category"],
    },
];

const FEATURES = [
    "ATS-optimised formatting",
    "Petroleum engineering terminology library",
    "Keyword suggestions for job requirements",
    "IWCF / NEBOSH certification display",
    "Multi-language support (AR / EN / FR)",
    "Cloud save & version history",
];

export default function CVBuilderPage() {
    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 xl:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-navy-400 mb-8">
                    <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/explore/career/jobs" className="hover:text-primary transition-colors">Career</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">CV Builder</span>
                </div>

                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                            <Zap className="w-4 h-4" /> Built for Petroleum Engineers
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
                            Your CV, <br /><span className="text-gradient-gold">Professionally Done</span>
                        </h1>
                        <p className="text-navy-200 text-xl leading-relaxed mb-8">
                            Create a job-winning petroleum engineering CV in minutes using our industry-specific templates and smart content assistant — completely free.
                        </p>
                        <Button size="xl" className="shadow-gold-md px-10 text-lg">
                            Start Building My CV <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>
                </div>

                {/* Steps */}
                <div className="mb-20">
                    <h2 className="font-display text-3xl text-white text-center mb-12">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connector lines */}
                        <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/40 to-teal-400/40" />

                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    className={`relative bg-gradient-to-br ${step.color} border ${step.border} rounded-2xl p-6 text-center`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-navy-900 border ${step.border} flex items-center justify-center mx-auto mb-5 relative`}>
                                        <Icon className={`w-6 h-6 ${step.accent}`} />
                                        <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-navy-950 border ${step.border} text-[10px] font-bold ${step.accent} flex items-center justify-center`}>
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl text-white mb-3">{step.title}</h3>
                                    <p className="text-navy-300 text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Template Previews */}
                <div className="mb-20">
                    <h2 className="font-display text-3xl text-white text-center mb-3">Choose Your Template</h2>
                    <p className="text-navy-400 text-center mb-10">All templates are optimised for oil & gas recruitment</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TEMPLATES.map((tpl, idx) => (
                            <motion.div
                                key={tpl.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative group bg-navy-900 border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.1)] hover:-translate-y-1 ${tpl.isPopular ? 'border-primary/50' : 'border-navy-600 hover:border-navy-400'}`}
                            >
                                {tpl.isPopular && (
                                    <div className="absolute top-3 right-3 z-10 bg-gradient-gold text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded-full">Most Popular</div>
                                )}

                                {/* Template Preview Mock */}
                                <div className={`h-52 bg-gradient-to-br ${tpl.color} p-5 relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(135deg, ${tpl.accent}15 25%, transparent 25%)` }} />
                                    {/* Mock CV lines */}
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 rounded" style={{ background: tpl.accent, opacity: 0.8 }} />
                                        <div className="h-2 w-24 bg-white/20 rounded" />
                                        <div className="h-px w-full bg-white/10 my-3" />
                                        {[48, 64, 56, 40, 52].map((w, i) => (
                                            <div key={i} className="h-1.5 rounded bg-white/15" style={{ width: `${w}%` }} />
                                        ))}
                                        <div className="h-px w-full bg-white/10 my-3" />
                                        <div className="flex gap-1.5 flex-wrap">
                                            {[3, 4, 3, 4].map((w, i) => (
                                                <div key={i} className="h-4 rounded px-2" style={{ width: `${w * 12}px`, background: tpl.accent, opacity: 0.4 }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-display text-xl text-white mb-1">{tpl.name}</h3>
                                    <p className="text-xs font-medium mb-3" style={{ color: tpl.accent }}>{tpl.tagline}</p>
                                    <p className="text-sm text-navy-300 mb-4">{tpl.preview}</p>
                                    <ul className="space-y-1.5 mb-5">
                                        {tpl.features.map(f => (
                                            <li key={f} className="flex items-center gap-2 text-xs text-navy-200">
                                                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tpl.accent }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant={tpl.isPopular ? "primary" : "outline"} size="sm" className={`w-full ${tpl.isPopular ? 'shadow-gold-sm' : ''}`}>
                                        Use this Template
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="bg-navy-900/50 border border-navy-600 rounded-3xl p-8 md:p-12 mb-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="font-display text-3xl text-white mb-4">Everything you need to stand out</h2>
                            <p className="text-navy-300 mb-6">Our CV builder is designed specifically for petroleum and process engineers — not generic roles.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {FEATURES.map(f => (
                                    <div key={f} className="flex items-center gap-2.5 text-sm text-navy-200">
                                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 bg-navy-950/50 rounded-2xl border border-primary/20">
                            <FileText className="w-16 h-16 text-primary mb-4" />
                            <p className="text-4xl font-display text-white mb-2">2,400+</p>
                            <p className="text-navy-300 mb-6">Engineers have used HELM CV Builder</p>
                            <Button size="lg" className="shadow-gold-md">
                                Start for Free <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
