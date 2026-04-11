"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeColors } from "@/lib/useThemeColors";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useThemeColors();

    return (
        <footer className={`pt-20 pb-10 border-t ${t.borderMuted} relative overflow-hidden`} style={{ backgroundColor: t.bg }}>
            {/* Subtle Top Gold Border */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-gold opacity-50" />

            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* ── Col 1: Brand & Social ── */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 outline-none inline-block">
                            <Image
                                src="/assets/logos/helmlogo.png"
                                alt="HELM Academy"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                            />
                            <div>
                                <span className={`block text-xl font-display font-bold ${t.heading} tracking-tight leading-none`}>
                                    HELM
                                </span>
                                <span className="block text-[10px] font-body text-primary tracking-[0.2em] uppercase mt-0.5">
                                    Academy
                                </span>
                            </div>
                        </Link>

                        <p className={`text-sm ${t.body} font-body leading-relaxed max-w-xs`}>
                            Engineer your future in energy. The premier petroleum engineering learning platform for professionals across Algeria and the MENA region.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Linkedin, Twitter, Youtube, Send].map((Icon, i) => {
                                const labels = ["LinkedIn", "Twitter", "YouTube", "Telegram"];
                                return (
                                    <a key={labels[i]} href="#" className={`w-9 h-9 rounded ${t.cardBgSubtle} flex items-center justify-center ${t.body} hover:bg-primary/20 hover:text-primary transition-colors border ${t.borderAccent} hover:border-primary/30 outline-none`}>
                                        <Icon className="h-4 w-4" />
                                        <span className="sr-only">{labels[i]}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Col 2: Explore ── */}
                    <div>
                        <h4 className={`font-display ${t.heading} text-lg font-semibold mb-6`}>Explore</h4>
                        <ul className="space-y-4">
                            {['Engineering Programs', 'Learning Paths', 'Professional Certifications', 'Technical Library', 'Job Board'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className={`text-sm ${t.body} hover:text-primary transition-colors flex items-center gap-2 group outline-none`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${t.isDark ? "bg-navy-600" : "bg-slate-300"} group-hover:bg-primary transition-colors`} />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Company ── */}
                    <div>
                        <h4 className={`font-display ${t.heading} text-lg font-semibold mb-6`}>Company</h4>
                        <ul className="space-y-4">
                            {['About HELM', 'Careers', 'Instructor Application', 'Corporate Training', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className={`text-sm ${t.body} hover:text-primary transition-colors flex items-center gap-2 group outline-none`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${t.isDark ? "bg-navy-600" : "bg-slate-300"} group-hover:bg-primary transition-colors`} />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 4: Newsletter CTA ── */}
                    <div className={`glass-strong p-6 rounded-xl ${t.borderFaint}`}>
                        <h4 className={`font-display ${t.heading} text-lg font-semibold mb-2`}>Join our Newsletter</h4>
                        <p className={`text-sm ${t.body} font-body mb-5`}>
                            Get the latest insights, course drops, and industry news delivered weekly.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                variant="filled"
                                className={t.cardBgSubtle}
                                required
                            />
                            <Button type="submit" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Subscribe
                            </Button>
                        </form>
                        <p className={`text-[10px] ${t.subtle} mt-3 text-center`}>
                            By subscribing, you agree to our Privacy Policy.
                        </p>
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div className={`pt-8 border-t ${t.borderMuted} flex flex-col md:flex-row items-center justify-between gap-4`}>
                    <p className={`text-xs ${t.muted} font-body text-center md:text-left`}>
                        &copy; {currentYear} HELM Academy. All rights reserved.
                    </p>
                    <div className={`flex items-center gap-6 text-xs ${t.muted} font-body`}>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
