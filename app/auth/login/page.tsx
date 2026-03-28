"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap, Building2, GraduationCap } from "lucide-react";

/* ─── helpers ──────────────────────── */
const fadeLeft  = { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.55, ease: "easeOut" as const } };
const fadeRight = { initial: { opacity: 0, x:  30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.55, ease: "easeOut" as const } };
const stagger   = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.25 + i * 0.08, ease: "easeOut" as const } });

/* ─── sub-components ───────────────── */
function InputField({
    label, type = "text", icon, placeholder, value, onChange, suffix,
}: {
    label: string; type?: string; icon: React.ReactNode; placeholder: string;
    value: string; onChange: (v: string) => void; suffix?: React.ReactNode;
}) {
    return (
        <div className="w-full">
            <label className="block text-xs font-medium text-[#8A9BBC] mb-1.5">{label}</label>
            <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6A8A] pointer-events-none">{icon}</span>
                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-12 pl-10 pr-10 rounded-xl text-sm text-white placeholder:text-[#3D5A7A] outline-none transition-all duration-200 bg-[#132238] border border-[#1A2E4A] focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20"
                />
                {suffix && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</span>
                )}
            </div>
        </div>
    );
}

/* ─── main page ────────────────────── */
export default function AuthLoginPage() {
    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading,  setLoading]  = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setLoading(false);
    };

    const FEATURES = [
        { Icon: Zap,           text: "500+ Petroleum Engineering Courses" },
        { Icon: Building2,     text: "Career tools trusted by 50+ companies" },
        { Icon: GraduationCap, text: "Accredited learning internationally" },
    ];

    const STATS = [
        { n: "12.4K", l: "Engineers"  },
        { n: "500+",  l: "Courses"    },
        { n: "50+",   l: "Companies"  },
        { n: "94%",   l: "Placement"  },
    ];

    return (
        <div className="flex min-h-screen overflow-hidden">

            {/* ══════════════════════════════════════
                LEFT PANEL — Brand
            ══════════════════════════════════════ */}
            <motion.div {...fadeLeft}
                className="hidden lg:flex lg:w-1/2 flex-col justify-between px-12 py-14 border-r border-[#D4A017]/20 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0A1628 0%, #0F2040 100%)" }}>

                {/* Decorative dot-grid */}
                <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

                {/* Ambient orbs */}
                <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 9, repeat: Infinity }}
                    className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#D4A017]/8 blur-[120px] pointer-events-none" />
                <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }}
                    className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-teal-500/8 blur-[100px] pointer-events-none" />

                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4A017]/50 to-transparent" />

                {/* ── Logo ── */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg, #D4A017, #A07010)" }}>
                        <span className="font-serif font-bold text-[#0A1628] text-base">H</span>
                    </div>
                    <span className="font-serif text-lg text-white tracking-tight">HELM ACADEMY</span>
                </div>

                {/* ── Headline + features ── */}
                <div className="relative z-10 space-y-8">
                    <div>
                        <h1 className="font-display text-[48px] leading-[1.15] text-white mb-4">
                            Engineer Your Future<br />
                            <span style={{ color: "#D4A017" }}>in Energy.</span>
                        </h1>
                        <p className="text-[16px] leading-relaxed max-w-sm" style={{ color: "#8A9BBC" }}>
                            The #1 platform built by petroleum engineers — for those who will shape the energy industry.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FEATURES.map(({ Icon, text }) => (
                            <div key={text} className="flex items-center gap-3.5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.25)" }}>
                                    <Icon className="w-4 h-4" style={{ color: "#D4A017" }} />
                                </div>
                                <span className="text-sm text-[#A8BDD0]">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Stats row ── */}
                <div className="relative z-10 grid grid-cols-4 gap-3">
                    {STATS.map(s => (
                        <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <p className="font-bold text-xl" style={{ color: "#D4A017" }}>{s.n}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: "#6A849C" }}>{s.l}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ══════════════════════════════════════
                RIGHT PANEL — Form
            ══════════════════════════════════════ */}
            <motion.div {...fadeRight}
                className="flex w-full lg:w-1/2 items-center justify-center px-6 py-14 relative overflow-hidden"
                style={{ background: "#0F2040" }}>

                {/* Subtle ambient */}
                <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
                    style={{ background: "rgba(212,160,23,0.04)" }} />

                {/* Mobile-only logo */}
                <div className="absolute top-5 left-5 flex lg:hidden items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #D4A017, #A07010)" }}>
                        <span className="font-serif font-bold text-[#0A1628] text-xs">H</span>
                    </div>
                    <span className="font-serif text-sm text-white">HELM ACADEMY</span>
                </div>

                <div className="w-full max-w-md relative z-10">

                    {/* Heading */}
                    <motion.div {...stagger(0)}>
                        <h2 className="font-display text-[32px] text-white mb-1">Welcome back</h2>
                        <p className="text-sm mb-8" style={{ color: "#8A9BBC" }}>Sign in to continue your journey.</p>
                    </motion.div>

                    {/* Google button */}
                    <motion.div {...stagger(1)}>
                        <button
                            type="button"
                            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl font-medium text-sm transition-all duration-200 hover:brightness-95 active:scale-[0.99] mb-5"
                            style={{ background: "#ffffff", color: "#1a1a1a", border: "none" }}>
                            {/* Google "G" icon — exactly 20×20 */}
                            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div {...stagger(2)} className="relative flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px" style={{ background: "#1A2E4A" }} />
                        <span className="text-xs" style={{ color: "#4A6A8A" }}>or continue with email</span>
                        <div className="flex-1 h-px" style={{ background: "#1A2E4A" }} />
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        <motion.div {...stagger(3)} className="mb-4">
                            <InputField
                                label="Email address"
                                type="email"
                                icon={<Mail className="w-4 h-4" />}
                                placeholder="you@example.com"
                                value={email}
                                onChange={setEmail}
                            />
                        </motion.div>

                        <motion.div {...stagger(4)} className="mb-5">
                            <InputField
                                label="Password"
                                type={showPass ? "text" : "password"}
                                icon={<Lock className="w-4 h-4" />}
                                placeholder="••••••••"
                                value={password}
                                onChange={setPassword}
                                suffix={
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(p => !p)}
                                        className="text-[#4A6A8A] hover:text-[#D4A017] transition-colors p-0.5"
                                        aria-label={showPass ? "Hide password" : "Show password"}>
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                }
                            />
                        </motion.div>

                        {/* Remember + forgot */}
                        <motion.div {...stagger(5)} className="flex items-center justify-between mb-6">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                    className="w-4 h-4 rounded accent-[#D4A017]"
                                />
                                <span className="text-sm" style={{ color: "#8A9BBC" }}>Remember me</span>
                            </label>
                            <Link href="/auth/forgot-password"
                                className="text-sm font-medium transition-opacity hover:opacity-70"
                                style={{ color: "#D4A017" }}>
                                Forgot password?
                            </Link>
                        </motion.div>

                        {/* Sign In button */}
                        <motion.div {...stagger(6)}>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full h-[52px] rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ background: "#D4A017", color: "#0A1628", filter: loading ? undefined : undefined }}>
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in…
                                    </>
                                ) : "Sign In"}
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Bottom link */}
                    <motion.p {...stagger(7)} className="text-center text-sm mt-6" style={{ color: "#6A849C" }}>
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register"
                            className="font-semibold transition-opacity hover:opacity-70"
                            style={{ color: "#D4A017" }}>
                            Create one
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}
