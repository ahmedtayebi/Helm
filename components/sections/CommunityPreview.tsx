"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Video, ArrowRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useThemeColors } from "@/lib/useThemeColors";

const webinars = [
    {
        id: 1,
        title: "Future of Deepwater Drilling Technologies",
        date: "Oct 24, 2026",
        time: "18:00 GST",
        speaker: "Eng. Hassan K.",
        role: "Senior Drilling Engineer",
    },
    {
        id: 2,
        title: "Carbon Capture & Storage (CCS) Fundamentals",
        date: "Nov 02, 2026",
        time: "14:00 GST",
        speaker: "Dr. Amina F.",
        role: "HSE Director",
    },
    {
        id: 3,
        title: "AI Applications in Reservoir Simulation",
        date: "Nov 15, 2026",
        time: "16:00 GST",
        speaker: "Prof. Omar N.",
        role: "Lead Data Engineer",
    },
];

export function CommunityPreview() {
    const t = useThemeColors();

    return (
        <section className={`section-padding ${t.sectionBg} border-b ${t.borderMuted}`}>
            <div className="section-container">

                {/* Header */}
                <motion.div
                    className="text-center md:text-left mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge variant="outline" className="mb-4">Community & Events</Badge>
                    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl ${t.heading} mb-4`}>
                        Join the <span className="text-gradient-gold">Network</span>
                    </h2>
                    <p className={`${t.body} font-body text-lg max-w-2xl`}>
                        Engage with peers, attend live masterclasses, and learn from the experiences of our alumni who are now leading the energy sector.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Webinars list */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className={`text-xl font-display font-medium ${t.heading} mb-6 flex items-center gap-2`}>
                            <Video className="h-5 w-5 text-primary" />
                            Upcoming Live Masterclasses
                        </h3>

                        <div className="space-y-4">
                            {webinars.map((webinar) => (
                                <div
                                    key={webinar.id}
                                    className={`p-5 rounded-2xl glass border ${t.borderFaint} hover:border-primary/50 transition-colors group flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center cursor-pointer`}
                                >
                                    <div className={`flex-shrink-0 text-left sm:text-center p-3 sm:px-4 sm:py-3 ${t.isDark ? "bg-navy-950/50" : "bg-slate-100"} rounded-xl border ${t.isDark ? "border-navy-600/50" : "border-slate-200"} min-w[100px]`}>
                                        <span className="block text-primary font-bold text-lg leading-none mb-1">
                                            {webinar.date.split(" ")[1].replace(",", "")}
                                        </span>
                                        <span className={`block text-xs ${t.muted} font-medium uppercase tracking-wider`}>
                                            {webinar.date.split(" ")[0]}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className={`${t.heading} font-medium text-lg leading-tight mb-2 group-hover:text-primary transition-colors`}>
                                            {webinar.title}
                                        </h4>
                                        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${t.muted}`}>
                                            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {webinar.time}</span>
                                            <span className="flex items-center gap-1.5">👤 {webinar.speaker}</span>
                                        </div>
                                    </div>

                                    <div className={`hidden sm:flex self-center w-10 h-10 rounded-full border ${t.borderFaint} flex-shrink-0 items-center justify-center group-hover:bg-primary/10 group-hover:border-primary transition-all`}>
                                        <ArrowRight className={`h-4 w-4 ${t.muted} group-hover:text-primary`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="mt-4 w-full sm:w-auto">View All Events</Button>
                    </motion.div>

                    {/* Right Column: Success Story Gradient Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative h-full"
                    >
                        <div className={`absolute inset-0 ${t.isDark ? "bg-gradient-to-br from-navy-800 to-navy-950" : "bg-gradient-to-br from-slate-100 to-white"} rounded-3xl border ${t.borderFaint} shadow-2xl overflow-hidden p-8 flex flex-col justify-between`}>

                            {/* Background glow overlay */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                            <Quote className="h-12 w-12 text-primary/30 mb-6" />

                            <p className={`text-xl md:text-2xl font-display ${t.heading} italic leading-relaxed relative z-10 mb-8`}>
                                &quot;HELM Academy transformed my theoretical university knowledge into practical field expertise. The Drilling Engineering program directly helped me secure my competitive position at Sonatrach.&quot;
                            </p>

                            <div className="flex justify-between items-end relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full ${t.isDark ? "bg-navy-600" : "bg-slate-200"} border-2 border-primary/50 overflow-hidden`}>
                                        {/* Placeholder for student avatar */}
                                        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center" />
                                    </div>
                                    <div>
                                        <h5 className={`${t.heading} font-bold text-lg`}>Yassine B.</h5>
                                        <p className={`${t.muted} text-sm`}>Well Completion Engineer</p>
                                    </div>
                                </div>

                                <Badge variant="warning" className="hidden sm:inline-flex">Alumni Success</Badge>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
