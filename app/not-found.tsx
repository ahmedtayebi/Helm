"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/3" />
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
            <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-teal-500/5 blur-[60px] pointer-events-none" />

            <div className="relative max-w-lg w-full text-center">
                {/* Oil Rig Illustration */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="mb-8">
                    <div className="relative inline-block">
                        {/* Derrick SVG */}
                        <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                            {/* Base platform */}
                            <rect x="15" y="120" width="90" height="8" rx="2" fill="#1a2e47" stroke="#D4A017" strokeWidth="1" />
                            {/* Main structure - left leg */}
                            <line x1="60" y1="20" x2="20" y2="120" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" />
                            {/* Main structure - right leg */}
                            <line x1="60" y1="20" x2="100" y2="120" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" />
                            {/* Cross braces */}
                            <line x1="35" y1="80" x2="85" y2="80" stroke="#D4A017" strokeOpacity="0.5" strokeWidth="1.5" />
                            <line x1="27" y1="100" x2="93" y2="100" stroke="#D4A017" strokeOpacity="0.5" strokeWidth="1.5" />
                            <line x1="43" y1="60" x2="77" y2="60" stroke="#D4A017" strokeOpacity="0.5" strokeWidth="1.5" />
                            <line x1="50" y1="40" x2="70" y2="40" stroke="#D4A017" strokeOpacity="0.5" strokeWidth="1.5" />
                            {/* Top cap */}
                            <circle cx="60" cy="18" r="5" fill="#D4A017" />
                            {/* Drill string */}
                            <line x1="60" y1="23" x2="60" y2="120" stroke="#F5C518" strokeWidth="1.5" strokeDasharray="4 3" />
                            {/* Flare */}
                            <motion.ellipse animate={{ opacity: [0.5, 1, 0.5], ry: [4, 6, 4] }} transition={{ duration: 2, repeat: Infinity }}
                                cx="100" cy="75" rx="3" ry="5" fill="#F5A623" opacity="0.8" />
                        </svg>
                        {/* Ground line */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    </div>
                </motion.div>

                {/* Error content */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <p className="text-7xl font-display font-bold text-primary/20 mb-2 leading-none">404</p>
                    <h1 className="font-display text-3xl md:text-4xl text-white mb-3">Lost in the Field?</h1>
                    <p className="text-navy-400 text-base mb-8 max-w-sm mx-auto">
                        Looks like this well came up dry. The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/">
                        <Button className="gap-2 shadow-gold-sm font-bold"><Home className="w-4 h-4" />Back to Surface</Button>
                    </Link>
                    <Link href="/explore/programs">
                        <Button variant="outline" className="gap-2"><Search className="w-4 h-4" />Explore Courses</Button>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-8">
                    <button onClick={() => window.history.back()} className="flex items-center justify-center gap-1.5 text-sm text-navy-500 hover:text-primary transition-colors mx-auto">
                        <ArrowLeft className="w-4 h-4" />Go back
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
