"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ── Animated Mesh Background ──
function MeshBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-[#1A1500]" />

            {/* Animated Glow Blobs */}
            <motion.div
                className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[150px]"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: "linear-gradient(rgba(212, 160, 23, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 160, 23, 1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }}
            />
        </div>
    );
}

export function FinalCTA() {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
            <MeshBackground />

            <div className="section-container relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
                        Ready to Advance Your <br className="hidden sm:block" />
                        <span className="text-gradient-gold">Petroleum Career?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-navy-200 font-body mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join 12,000+ engineers from Sonatrach, Saudi Aramco, and BP who are using HELM Academy to future-proof their skills.
                    </p>

                    <form className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto mb-8" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            variant="default"
                            className="h-14 bg-navy-900/80 backdrop-blur-md border-primary/30 focus:border-primary text-base px-6 shadow-inner"
                            required
                        />
                        <Button size="xl" type="submit" className="w-full sm:w-auto h-14 px-8 shadow-gold-md">
                            Start Learning
                        </Button>
                    </form>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-navy-300 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>7-Day Free Trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>Cancel Anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>Verified Certificates</span>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
