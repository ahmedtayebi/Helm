"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Play, ExternalLink, MessageSquare, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeColors } from "@/lib/useThemeColors";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
});

const UPCOMING_EVENTS = [
    {
        id: 1,
        title: "Well Control in HPHT Environments",
        speaker: "Dr. Karim Bouzid",
        role: "Senior Well Control Engineer, Sonatrach",
        date: "Mar 20, 2026",
        time: "14:00 CET",
        type: "Webinar",
        spots: 240,
    },
    {
        id: 2,
        title: "Career Panel: From Grad to Rig Supervisor in 5 Years",
        speaker: "3 Industry Panelists",
        role: "SLB, TotalEnergies, BP Algeria",
        date: "Mar 27, 2026",
        time: "15:00 CET",
        type: "Panel",
        spots: 500,
    },
    {
        id: 3,
        title: "Intro to Geomechanics for Drilling Engineers",
        speaker: "Prof. Amina Saidi",
        role: "USTHB & TOTAL Research Chair",
        date: "Apr 3, 2026",
        time: "11:00 CET",
        type: "Workshop",
        spots: 150,
    },
    {
        id: 4,
        title: "Petroleum Economics in a Low-Carbon World",
        speaker: "Dr. Leyla Hamdi",
        role: "Energy Economist, IEA Alumni",
        date: "Apr 10, 2026",
        time: "14:00 CET",
        type: "Webinar",
        spots: 300,
    },
];

const PAST_WEBINARS = [
    { id: 1, title: "Directional Drilling Fundamentals", date: "Feb 2026", thumb: "⛏️", views: "2.4k" },
    { id: 2, title: "Understanding Reservoir Drive Mechanisms", date: "Jan 2026", thumb: "🗺️", views: "1.8k" },
    { id: 3, title: "PSM & Process Safety for Graduates", date: "Jan 2026", thumb: "🦺", views: "3.1k" },
    { id: 4, title: "ESP Selection & Troubleshooting", date: "Dec 2025", thumb: "⚡", views: "1.5k" },
    { id: 5, title: "LNG Plant Operations Overview", date: "Dec 2025", thumb: "🏭", views: "2.0k" },
    { id: 6, title: "Building Your SPE Student Chapter", date: "Nov 2025", thumb: "🎓", views: "892" },
];

const SUCCESS_STORIES = [
    {
        name: "Yacine Bouaziz",
        location: "Algiers → Aberdeen, UK",
        before: "Struggling to find a drilling job after graduation with no field experience",
        after: "Hired as Drilling Engineer Trainee at Seadrill after completing HELM\u0027s Directional Drilling Masterclass",
        quote: "HELM gave me the technical depth that set me apart in interviews. The instructors answer questions within hours.",
        company: "Seadrill",
        avatar: "YB",
        change: "Student → Junior Drilling Engineer",
    },
    {
        name: "Meriem Oukasha",
        location: "Oran, Algeria",
        before: "5 years in production with no clear path to advancement or formal HSE certification",
        after: "Promoted to HSE Coordinator after earning her HELM HSE Specialist certificate and landing a role at TotalEnergies",
        quote: "I completed the entire HSE track in 3 months alongside my day job. The Arabic modules were a game changer for me.",
        company: "TotalEnergies",
        avatar: "MO",
        change: "Production Technician → HSE Coordinator",
    },
    {
        name: "Sofiane Meziane",
        location: "Constantine, Algeria",
        before: "Recent petroleum economics graduate with minimal industry exposure and limited network",
        after: "Secured a competitive internship at Sonatrach\u0027s planning division through HELM\u0027s job board connection",
        quote: "The HELM career team helped me polish my CV and prep for technical interviews. I got the internship within 6 weeks of joining.",
        company: "Sonatrach",
        avatar: "SM",
        change: "New Graduate → Sonatrach Planning Intern",
    },
];

const TYPE_STYLES: Record<string, string> = {
    Webinar: "bg-primary/15 text-primary border-primary/30",
    Panel: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    Workshop: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function CommunityPage() {
    const [registered, setRegistered] = useState<number[]>([]);
    const t = useThemeColors();

    const handleRegister = (id: number) => {
        setRegistered(prev => prev.includes(id) ? prev : [...prev, id]);
    };

    return (
        <div className={`${t.sectionBgAlt} min-h-screen pt-16`}>
            {/* Hero */}
            <section className="relative py-24 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/6 to-transparent" />
                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className={`font-display text-4xl md:text-5xl ${t.heading} mb-4`}>
                        HELM <span className="text-gradient-gold">Community</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className={`${t.muted} text-lg max-w-xl mx-auto`}>
                        Learn together. Grow together. 12,000+ engineers sharing knowledge, opportunities, and success.
                    </motion.p>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className={`font-display text-3xl ${t.heading} mb-1`}>Upcoming Events &amp; Webinars</h2>
                            <p className={`${t.subtle} text-sm`}>Free to attend — live Q&amp;A with industry experts</p>
                        </div>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {UPCOMING_EVENTS.map((ev, idx) => (
                            <motion.div key={ev.id} {...fadeUp(idx * 0.08)}
                                className={`${t.cardBg} border ${t.borderSubtle} rounded-2xl p-6 hover:border-primary/30 transition-colors group relative overflow-hidden`}>
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wide ${TYPE_STYLES[ev.type]}`}>{ev.type}</span>
                                    <span className="text-xs text-teal-400 font-medium">{ev.spots} spots</span>
                                </div>
                                <h3 className={`font-display text-lg ${t.heading} mb-3`}>{ev.title}</h3>
                                <div className="flex items-center gap-2 mb-1">
                                    <User className={`w-3.5 h-3.5 ${t.faint} flex-shrink-0`} />
                                    <span className={`text-sm ${t.body} font-medium`}>{ev.speaker}</span>
                                </div>
                                <p className={`text-xs ${t.faint} mb-4 pl-5`}>{ev.role}</p>
                                <div className={`flex items-center gap-4 text-xs ${t.subtle} mb-5`}>
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{ev.time}</span>
                                </div>
                                {registered.includes(ev.id) ? (
                                    <div className="text-center py-2 text-sm text-teal-400 font-semibold">✓ You&apos;re registered! Check your email.</div>
                                ) : (
                                    <Button className="w-full" onClick={() => handleRegister(ev.id)}>Register Free</Button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Webinars */}
            <section className={`py-20 ${t.isDark ? "bg-navy-900/40" : "bg-slate-50/60"}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="mb-10">
                        <h2 className={`font-display text-3xl ${t.heading} mb-1`}>Past Webinar Recordings</h2>
                        <p className={`${t.subtle} text-sm`}>Missed a session? Watch the replay at your own pace.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PAST_WEBINARS.map((w, idx) => (
                            <motion.div key={w.id} {...fadeUp(idx * 0.07)}
                                className={`group ${t.cardBg} border ${t.borderSubtle} rounded-xl overflow-hidden hover:border-primary/25 transition-colors cursor-pointer`}>
                                <div className={`h-36 ${t.cardBgSubtle} flex items-center justify-center relative`}>
                                    <span className="text-4xl">{w.thumb}</span>
                                    <div className={`absolute inset-0 ${t.isDark ? "bg-navy-950/40" : "bg-slate-900/20"} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                                        <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                                            <Play className="w-5 h-5 text-primary fill-primary" />
                                        </div>
                                    </div>
                                    <div className={`absolute top-2 right-2 ${t.isDark ? "bg-navy-950/70" : "bg-slate-800/60"} rounded px-1.5 py-0.5 text-[10px] text-navy-300`}>Soon</div>
                                </div>
                                <div className="p-4">
                                    <p className={`text-sm font-semibold ${t.heading} mb-1`}>{w.title}</p>
                                    <div className={`flex justify-between text-xs ${t.faint}`}>
                                        <span>{w.date}</span>
                                        <span className="flex items-center gap-1"><Play className="w-2.5 h-2.5" />{w.views} views</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Forum Teaser */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()}
                        className="relative bg-gradient-to-r from-teal-500/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-10 text-center overflow-hidden">
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -right-20 w-48 h-48 border border-primary/10 rounded-full" />
                        <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className={`font-display text-3xl md:text-4xl ${t.heading} mb-3`}>Join the Discussion</h2>
                        <p className={`${t.muted} max-w-lg mx-auto mb-6`}>
                            The HELM Community Forum is where engineers ask questions, share field tips, and build lasting professional connections. <strong className={t.heading}>Launching Q2 2026.</strong>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button className="gap-2 shadow-gold-sm">Get Early Access <ChevronRight className="w-4 h-4" /></Button>
                            <Button variant="outline" className="gap-2"><ExternalLink className="w-4 h-4" />Follow on LinkedIn</Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Success Stories */}
            <section className={`py-20 ${t.isDark ? "bg-navy-900/40" : "bg-slate-50/60"}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Trophy className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Success Stories</span>
                        </div>
                        <h2 className={`font-display text-3xl md:text-4xl ${t.heading}`}>Real Engineers. Real Results.</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {SUCCESS_STORIES.map((story, idx) => (
                            <motion.div key={story.name} {...fadeUp(idx * 0.1)}
                                className={`${t.cardBg} border ${t.borderSubtle} rounded-2xl p-6 hover:border-primary/25 transition-colors flex flex-col`}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center font-display font-bold text-primary text-sm">{story.avatar}</div>
                                    <div>
                                        <p className={`font-semibold ${t.heading} text-sm`}>{story.name}</p>
                                        <p className={`text-xs ${t.faint}`}>{story.location}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-5 flex-1">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-red-400 mb-1">Before</p>
                                        <p className={`text-xs ${t.subtle} leading-relaxed`}>{story.before}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-teal-400 mb-1">After</p>
                                        <p className={`text-xs ${t.muted} leading-relaxed`}>{story.after}</p>
                                    </div>
                                </div>
                                <blockquote className={`text-sm ${t.muted} italic border-l-2 border-primary pl-3 mb-4`}>&ldquo;{story.quote}&rdquo;</blockquote>
                                <div className={`flex items-center justify-between pt-3 border-t ${t.borderClass}`}>
                                    <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 font-medium">{story.change}</span>
                                    <span className={`text-xs ${t.faint}`}>@ {story.company}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
