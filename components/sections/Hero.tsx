"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeColors } from "@/lib/useThemeColors";

// ── Particle Network Background ──
function ParticleBackground() {
    const [mounted, setMounted] = useState(false);
    const t = useThemeColors();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random particles (nodes) for the network
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // % width
        y: Math.random() * 100, // % height
        size: Math.random() * 3 + 1, // 1-4px
        duration: Math.random() * 20 + 20, // 20-40s
        delay: Math.random() * -20, // offset
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ backgroundColor: t.bg }}>
            {/* Deep Space Gradient Overlay */}
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${t.gradientOverlay} z-10`} />

            {/* Subtle Grid / Structural lines */}
            <div
                className="absolute inset-0 opacity-[0.03] z-10"
                style={{
                    backgroundImage:
                        `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
                    backgroundSize: "100px 100px",
                }}
            />

            {/* Hexagon Elements (Molecular Structure proxy) */}
            <motion.div
                className="absolute top-[20%] right-[15%] w-64 h-64 border border-primary/10 rounded-full z-0 opacity-30"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute inset-x-0 top-1/2 h-px bg-primary/20 rotate-45" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-primary/20 -rotate-45" />
            </motion.div>

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-primary z-0"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: p.size > 2 ? 0.3 : 0.1,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

// ── Animated Counter ──
function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const t = useThemeColors();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, isInView]);

    // Format large numbers with commas
    const formattedCount = new Intl.NumberFormat('en-US').format(count);

    return (
        <div ref={ref} className="text-center px-4 py-6 relative">
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 ${t.borderMuted} hidden md:block`} />
            <motion.p
                className="text-4xl sm:text-5xl font-display font-bold text-gradient-gold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {formattedCount}
                {suffix}
            </motion.p>
            <p className={`mt-2 text-sm ${t.body} font-body uppercase tracking-wider`}>
                {label}
            </p>
        </div>
    );
}

export function Hero() {
    const router = useRouter();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const t = useThemeColors();

    return (
        <section className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-12 overflow-hidden">
            <ParticleBackground />

            <motion.div
                className="section-container relative z-20 flex-1 flex flex-col justify-center items-center text-center mt-12"
                style={{ y: y1, opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className={`text-xs font-medium ${t.body} uppercase tracking-widest`}>
                        HELM Academy
                    </span>
                </motion.div>

                <motion.h1
                    className="text-balance font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <span className={`block ${t.heading}`}>Engineer Your</span>
                    <span className="block text-gradient-gold pb-2 shadow-sm">
                        Future in Energy
                    </span>
                </motion.h1>

                <motion.p
                    className={`mt-6 text-lg sm:text-xl ${t.body} font-body max-w-2xl mx-auto leading-relaxed`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    The #1 Arabic Platform for Petroleum Engineering Education. Master
                    industry-critical skills with experts from top global energy companies.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <Button
                        size="xl"
                        className="w-full sm:w-auto group"
                        rightIcon={<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        onClick={() => router.push("/explore/programs")}
                    >
                        Explore Programs
                    </Button>
                    <Button
                        variant="outline"
                        size="xl"
                        className={`w-full sm:w-auto backdrop-blur-md ${t.isDark ? "bg-navy-900/40" : "bg-white/60"}`}
                        leftIcon={<BookOpen className="h-5 w-5" />}
                        onClick={() => router.push("/library")}
                    >
                        Browse Library
                    </Button>
                </motion.div>
            </motion.div>

            {/* ── Stats Row ── */}
            <motion.div
                className="relative z-20 section-container mt-auto pt-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
                <div className={`glass-strong rounded-2xl border ${t.borderFaint} p-2 shadow-2xl`}>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-0 divide-x-0 md:divide-x ${t.isDark ? "divide-navy-500/30" : "divide-slate-200"}`}>
                        <AnimatedCounter value={500} suffix="+" label="Courses" />
                        <AnimatedCounter value={12000} suffix="+" label="Engineers" />
                        <AnimatedCounter value={50} suffix="+" label="Companies" />
                        <AnimatedCounter value={6} label="Specializations" />
                    </div>
                </div>
            </motion.div>

            {/* Fade out gradient at bottom */}
            <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${t.bottomFade} to-transparent z-10 pointer-events-none`} />
        </section>
    );
}
