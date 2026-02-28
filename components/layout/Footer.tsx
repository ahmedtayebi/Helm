"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Linkedin, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#060E1A] pt-20 pb-10 border-t border-navy-500/30 relative overflow-hidden">
            {/* Subtle Top Gold Border */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-gold opacity-50" />

            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* ── Col 1: Brand & Social ── */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 outline-none inline-block">
                            <div className="w-10 h-10 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm">
                                <GraduationCap className="h-6 w-6 text-navy-900" />
                            </div>
                            <div>
                                <span className="block text-xl font-display font-bold text-white tracking-tight leading-none">
                                    HELM
                                </span>
                                <span className="block text-[10px] font-body text-primary tracking-[0.2em] uppercase mt-0.5">
                                    Academy
                                </span>
                            </div>
                        </Link>

                        <p className="text-sm text-navy-200 font-body leading-relaxed max-w-xs">
                            Engineer your future in energy. The premier petroleum engineering learning platform for professionals across Algeria and the MENA region.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href="#" className="w-9 h-9 rounded bg-navy-800 flex items-center justify-center text-navy-200 hover:bg-primary/20 hover:text-primary transition-colors border border-navy-600 hover:border-primary/30 outline-none">
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-navy-800 flex items-center justify-center text-navy-200 hover:bg-primary/20 hover:text-primary transition-colors border border-navy-600 hover:border-primary/30 outline-none">
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-navy-800 flex items-center justify-center text-navy-200 hover:bg-primary/20 hover:text-primary transition-colors border border-navy-600 hover:border-primary/30 outline-none">
                                <Youtube className="h-4 w-4" />
                                <span className="sr-only">YouTube</span>
                            </a>
                            <a href="#" className="w-9 h-9 rounded bg-navy-800 flex items-center justify-center text-navy-200 hover:bg-primary/20 hover:text-primary transition-colors border border-navy-600 hover:border-primary/30 outline-none">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Telegram</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Col 2: Explore ── */}
                    <div>
                        <h4 className="font-display text-white text-lg font-semibold mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {['Engineering Programs', 'Learning Paths', 'Professional Certifications', 'Technical Library', 'Job Board'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-navy-200 hover:text-primary transition-colors flex items-center gap-2 group outline-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-navy-600 group-hover:bg-primary transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Company ── */}
                    <div>
                        <h4 className="font-display text-white text-lg font-semibold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About HELM', 'Careers', 'Instructor Application', 'Corporate Training', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-sm text-navy-200 hover:text-primary transition-colors flex items-center gap-2 group outline-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-navy-600 group-hover:bg-primary transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 4: Newsletter CTA ── */}
                    <div className="glass-strong p-6 rounded-xl border-navy-500/50">
                        <h4 className="font-display text-white text-lg font-semibold mb-2">Join our Newsletter</h4>
                        <p className="text-sm text-navy-200 font-body mb-5">
                            Get the latest insights, course drops, and industry news delivered weekly.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                variant="filled"
                                className="bg-navy-800"
                                required
                            />
                            <Button type="submit" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-[10px] text-navy-400 mt-3 text-center">
                            By subscribing, you agree to our Privacy Policy.
                        </p>
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div className="pt-8 border-t border-navy-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-navy-300 font-body text-center md:text-left">
                        &copy; {currentYear} HELM Academy. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-navy-300 font-body">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
