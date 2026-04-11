"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Users, Languages, Briefcase, Award, Library, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useThemeColors } from "@/lib/useThemeColors";

const features = [
    {
        icon: Users,
        title: "Industry Experts",
        description: "Learn directly from active petroleum engineers working in top global and regional energy companies.",
    },
    {
        icon: Languages,
        title: "Arabic & English Content",
        description: "The first platform to offer high-level technical petroleum engineering content localized in Arabic.",
    },
    {
        icon: Briefcase,
        title: "Career Ready",
        description: "Connect with top energy companies for internships, mentorships, and full-time engineering roles.",
    },
    {
        icon: Award,
        title: "Recognized Certificates",
        description: "Earn industry-backed certificates upon course completion to boost your professional portfolio.",
    },
    {
        icon: Library,
        title: "Massive Technical Library",
        description: "Access thousands of books, SPE papers, case studies, and field development plans.",
    },
    {
        icon: Cpu,
        title: "AI Engineering Tools",
        description: "Utilize smart calculators for drilling fluids, wellbore stability, and reservoir material balance.",
        badge: "Coming Soon",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};

export function Features() {
    const t = useThemeColors();

    return (
        <section className={`section-padding ${t.sectionBgAlt} relative overflow-hidden border-y ${t.borderMuted}`}>
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    <Badge variant="outline" className="mb-4">Why HELM Academy</Badge>
                    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl ${t.heading} mb-6`}>
                        The Standard in <span className="text-gradient-gold">Energy Education</span>
                    </h2>
                    <p className={`${t.body} font-body text-lg`}>
                        We bridge the gap between academic theory and field reality, empowering MENA&apos;s next generation of petroleum engineers.
                    </p>
                </div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                className="relative group flex flex-col items-center text-center"
                                variants={itemVariants}
                            >
                                {/* Connecting Line (Desktop only) */}
                                {idx < features.length - 1 && (idx + 1) % 3 !== 0 && (
                                    <div className={`hidden lg:block absolute top-10 left-[60%] w-[80%] h-px border-t border-dashed ${t.borderFaint} pointer-events-none`} />
                                )}

                                <div className={`w-20 h-20 rounded-2xl ${t.cardBgSubtle} border ${t.borderAccent} flex items-center justify-center mb-6 shadow-card group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:shadow-gold-glow transition-all duration-300 relative`}>
                                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-light transition-colors" />

                                    {/* Subtle pulsing ring on hover */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:block hidden animate-ping opacity-20" />
                                </div>

                                <h3 className={`font-display text-xl ${t.heading} mb-3 flex items-center justify-center gap-2`}>
                                    {feature.title}
                                    {feature.badge && (
                                        <Badge variant="warning" size="sm" className="hidden sm:inline-flex text-[9px] py-0 px-1.5 h-4">
                                            {feature.badge}
                                        </Badge>
                                    )}
                                </h3>

                                <p className={`text-sm ${t.body} leading-relaxed font-body max-w-xs`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
