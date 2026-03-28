"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput } from "@/components/ui/AuthInputs";

export default function AuthForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) { setError("Email address is required"); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address"); return; }
        setError("");
        setLoading(true);
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }} transition={{ duration: 9, repeat: Infinity }}
                className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center gap-2.5 justify-center mb-8">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-gold-sm">
                        <span className="text-navy-950 font-display font-bold text-base">H</span>
                    </div>
                    <span className="font-display text-xl text-white">HELM Academy</span>
                </div>

                <AnimatePresence mode="wait">
                    {!sent ? (
                        <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Link href="/auth/login" className="flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-colors mb-6">
                                <ArrowLeft className="w-4 h-4" /> Back to Sign In
                            </Link>
                            <div className="bg-navy-900/80 border border-navy-700 rounded-2xl p-8 backdrop-blur">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                                    <Mail className="w-7 h-7 text-primary" />
                                </div>
                                <h1 className="font-display text-3xl text-white mb-2">Forgot Password?</h1>
                                <p className="text-navy-400 text-sm mb-7 leading-relaxed">
                                    No problem. Enter your account email — we&apos;ll send you a reset link.
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    <AuthInput label="Email address" type="email" icon={<Mail className="w-4 h-4" />}
                                        placeholder="you@example.com" value={email}
                                        onChange={e => { setEmail(e.target.value); if (error) setError(""); }}
                                        error={error} />
                                    <Button type="submit" size="lg" className="w-full shadow-gold-sm font-bold" isLoading={loading}>
                                        {!loading && "Send Reset Link"}
                                    </Button>
                                </form>
                                <p className="text-center text-sm text-navy-500 mt-5">
                                    Remembered it?{" "}
                                    <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                            <div className="bg-navy-900/80 border border-navy-700 rounded-2xl p-10 text-center backdrop-blur">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                                        className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
                                        <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                                            className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    </motion.div>
                                    <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1, delay: 0.4 }}
                                        className="absolute inset-0 rounded-full border-2 border-green-500" />
                                </div>
                                <h2 className="font-display text-2xl text-white mb-3">Check your email</h2>
                                <p className="text-navy-300 mb-1">We sent a password reset link to</p>
                                <p className="text-white font-semibold mb-6">{email}</p>
                                <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 text-left mb-6 space-y-2">
                                    {["Link valid for 1 hour", "Check spam folder if you don't see it", "Help: support@helm-academy.dz"].map(tip => (
                                        <p key={tip} className="text-xs text-navy-300 flex items-center gap-2"><span className="text-green-400">✓</span>{tip}</p>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <button onClick={() => { setSent(false); setEmail(""); }}
                                        className="w-full text-sm text-navy-400 hover:text-primary transition-colors py-2">
                                        Resend with a different email
                                    </button>
                                    <Link href="/auth/login">
                                        <Button variant="outline" className="w-full">Back to Sign In</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
