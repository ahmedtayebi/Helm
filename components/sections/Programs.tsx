"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Flame, Droplets, BarChart3, Shield, GraduationCap, BookOpen } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useThemeColors } from "@/lib/useThemeColors";

const programs = [
    {
        id: "drilling",
        title: "Drilling Engineering",
        description: "Master well design, drilling fluids, bit selection, and directional drilling operations.",
        icon: Flame,
        color: "#F5C518",
        courseCount: 24,
        badge: "Most Popular",
    },
    {
        id: "reservoir",
        title: "Reservoir Engineering",
        description: "Learn reservoir simulation, well testing, reserves estimation, and enhanced oil recovery (EOR).",
        icon: Droplets,
        color: "#2DD4BF",
        courseCount: 18,
    },
    {
        id: "production",
        title: "Production Engineering",
        description: "Optimize artificial lift systems, well completions, and surface facilities.",
        icon: BarChart3,
        color: "#D4A017",
        courseCount: 15,
    },
    {
        id: "hse",
        title: "Health, Safety & Environment",
        description: "Industry-standard HSE management, risk assessment, and operational safety protocols.",
        icon: Shield,
        color: "#22C55E",
        courseCount: 12,
    },
    {
        id: "lng",
        title: "LNG Technology",
        description: "Deep dive into liquefied natural gas processing, transport, and storage systems.",
        icon: GraduationCap,
        color: "#2DD4BF",
        courseCount: 8,
        badge: "Trending",
    },
    {
        id: "economics",
        title: "Petroleum Economics",
        description: "Economic evaluation, risk analysis, project finance, and asset valuation in oil & gas.",
        icon: BookOpen,
        color: "#F5C518",
        courseCount: 10,
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function Programs() {
    const t = useThemeColors();

    return (
        <section className={`section-padding ${t.sectionBg} relative`}>
            <div className="section-container">

                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                >
                    <Badge variant="warning" className="mb-4">Specializations</Badge>
                    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl ${t.heading} mb-4`}>
                        Explore <span className="text-gradient-gold">Programs</span>
                    </h2>
                    <p className={`${t.body} font-body text-lg`}>
                        Comprehensive learning paths designed by industry experts to advance your career in every sector of the oil & gas industry.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {programs.map((prog) => {
                        const Icon = prog.icon;
                        return (
                            <motion.div key={prog.id} variants={itemVariants}>
                                <Card variant="glass" className="h-full group relative overflow-hidden flex flex-col">
                                    {/* Subtle Background Icon */}
                                    <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none transform group-hover:scale-110 group-hover:rotate-12">
                                        <Icon size={160} style={{ color: prog.color }} />
                                    </div>

                                    <CardContent className="flex-1 p-6 z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.cardBgSubtle} border ${t.borderAccent} group-hover:border-primary/40 transition-colors duration-300`}
                                                style={{ boxShadow: `0 4px 20px ${prog.color}20` }}
                                            >
                                                <Icon className="h-6 w-6" style={{ color: prog.color }} />
                                            </div>
                                            {prog.badge && (
                                                <Badge variant="outline" size="sm" className={`${t.isDark ? "bg-navy-900/50" : "bg-slate-100/80"}`}>
                                                    {prog.badge}
                                                </Badge>
                                            )}
                                        </div>

                                        <CardTitle className="mb-3 text-xl group-hover:text-primary-light transition-colors">
                                            {prog.title}
                                        </CardTitle>
                                        <CardDescription className={`text-sm leading-relaxed ${t.body}`}>
                                            {prog.description}
                                        </CardDescription>
                                    </CardContent>

                                    <CardFooter className="px-6 pb-6 pt-0 border-none z-10 mt-auto flex items-center justify-between">
                                        <span className={`text-xs font-semibold ${t.muted} uppercase tracking-wider`}>
                                            {prog.courseCount} Courses
                                        </span>
                                        <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors group/btn outline-none">
                                            Explore
                                            <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
