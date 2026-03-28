"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Building2, Check, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthInput, PasswordInput, AuthSelect } from "@/components/ui/AuthInputs";

/* ─── Types ───────────────────────── */
type Role = "student" | "instructor" | "company" | null;
type Step = 1 | 2 | 3;

/* ─── Role cards ──────────────────── */
const ROLES = [
    {
        id: "student" as const,
        emoji: "🎓",
        icon: GraduationCap,
        title: "Student / Engineer",
        desc: "I want to learn, earn certificates, and advance my petroleum engineering career.",
        accent: "from-primary/20 to-primary/5",
        border: "border-primary/50",
        glow: "shadow-[0_0_30px_rgba(212,160,23,0.2)]",
    },
    {
        id: "instructor" as const,
        emoji: "👨‍🏫",
        icon: BookOpen,
        title: "Instructor",
        desc: "I want to share my field expertise, create courses, and build a revenue stream.",
        accent: "from-teal-500/20 to-teal-500/5",
        border: "border-teal-500/50",
        glow: "shadow-[0_0_30px_rgba(45,212,191,0.15)]",
    },
    {
        id: "company" as const,
        emoji: "🏢",
        icon: Building2,
        title: "Company",
        desc: "I want to hire verified talent, post jobs, and upskill my engineering team.",
        accent: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/50",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
];

/* ─── Progress bar ─────────────────── */
function ProgressBar({ step, onStepClick }: { step: Step; onStepClick: (s: Step) => void }) {
    const labels = ["Choose Role", "Your Details", "Verify Email"];
    return (
        <div className="flex items-center gap-2 mb-10">
            {labels.map((l, i) => {
                const n = (i + 1) as Step;
                const done = step > n;
                const active = step === n;
                return (
                    <React.Fragment key={l}>
                        <div className="flex items-center gap-2">
                            <div
                                onClick={() => done && onStepClick(n)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-teal-500 text-white cursor-pointer hover:opacity-80" : active ? "bg-primary text-navy-950" : "bg-navy-800 border border-navy-600 text-navy-500"}`}>
                                {done ? <Check className="w-3.5 h-3.5" /> : n}
                            </div>
                            <span className={`text-xs hidden sm:block ${active ? "text-white font-medium" : "text-navy-500"}`}>{l}</span>
                        </div>
                        {i < 2 && <div className={`flex-1 h-px ${done ? "bg-teal-500" : "bg-navy-700"} transition-colors`} />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

/* ─── Step 1: Role Selection ───────── */
function StepRole({ onSelect }: { onSelect: (r: Role) => void }) {
    const [hovered, setHovered] = useState<Role>(null);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
                <h1 className="font-display text-3xl md:text-4xl text-white mb-3">How will you use HELM?</h1>
                <p className="text-navy-400 text-sm max-w-md mx-auto">Choose your role to get a personalized experience. You can always change this later.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROLES.map((role) => (
                    <motion.button key={role.id}
                        onHoverStart={() => setHovered(role.id)}
                        onHoverEnd={() => setHovered(null)}
                        onClick={() => onSelect(role.id)}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 bg-gradient-to-br overflow-hidden cursor-pointer ${hovered === role.id ? `${role.accent} ${role.border} ${role.glow}` : "from-navy-900 to-navy-900 border-navy-700"}`}>
                        {/* Corner glow */}
                        {hovered === role.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl bg-primary/20 pointer-events-none" />
                        )}
                        <div className="text-4xl mb-4">{role.emoji}</div>
                        <h3 className="font-display text-lg text-white mb-2">{role.title}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">{role.desc}</p>
                        <div className={`mt-5 flex items-center gap-1.5 text-xs font-medium transition-colors ${hovered === role.id ? "text-primary" : "text-navy-400"}`}>
                            Get started <ArrowRight className="w-3 h-3" />
                        </div>
                    </motion.button>
                ))}
            </div>
            <p className="text-center text-sm text-navy-500 mt-8">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
            </p>
        </motion.div>
    );
}

/* ─── Step 2: Form per role ────────── */
const SPECIALIZATIONS = [
    { value: "drilling", label: "Drilling Engineering" },
    { value: "reservoir", label: "Reservoir Engineering" },
    { value: "production", label: "Production Engineering" },
    { value: "hse", label: "HSE / Process Safety" },
    { value: "lng", label: "LNG & Gas Processing" },
    { value: "economics", label: "Petroleum Economics" },
];
const EXPERIENCE = [
    { value: "student", label: "Current Student" },
    { value: "0-2", label: "0–2 years" },
    { value: "3-5", label: "3–5 years" },
    { value: "6-10", label: "6–10 years" },
    { value: "10+", label: "10+ years" },
];
const COMPANY_SIZES = [
    { value: "startup", label: "Startup (< 50)" },
    { value: "sme", label: "SME (50–500)" },
    { value: "large", label: "Large (500–5000)" },
    { value: "enterprise", label: "Enterprise (5000+)" },
];

function StepForm({ role, onNext, onBack }: { role: Role; onNext: () => void; onBack: () => void }) {
    const [f, setF] = useState({ name: "", email: "", password: "", org: "", spec: "", exp: "", size: "" });
    const [loading, setLoading] = useState(false);
    const s = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));

    const roleLabel = ROLES.find(r => r.id === role);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!f.name || !f.email || !f.password) {
            alert("Please fill all required fields.");
            return;
        }
        if (f.password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setLoading(false);
        onNext();
    };

    return (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            {/* Back button */}
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-1 text-sm text-navy-400 hover:text-white transition-colors mb-5">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-3">
                    {roleLabel?.emoji} {roleLabel?.title}
                </div>
                <h2 className="font-display text-2xl text-white mb-1">Create your account</h2>
                <p className="text-sm text-navy-400">All fields are required.</p>
            </div>
            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <AuthInput label="Full Name" placeholder="Ahmed Benali" value={f.name} onChange={s("name")} required />
                    <AuthInput label="Email" type="email" icon={<Mail className="w-4 h-4" />} placeholder="you@email.com" value={f.email} onChange={s("email")} required />
                </div>
                <PasswordInput label="Password" placeholder="Min. 8 characters" value={f.password}
                    hint="Must include a number and uppercase letter" onChange={e => setF(p => ({ ...p, password: e.target.value }))} required />

                {role === "student" && (
                    <div className="grid grid-cols-1 gap-4">
                        <AuthInput label="University / Company" placeholder="USTHB, Sonatrach…" value={f.org} onChange={s("org")} />
                        <AuthSelect label="Specialization" options={SPECIALIZATIONS} placeholder="Choose one…"
                            value={f.spec} onChange={s("spec") as React.ChangeEventHandler<HTMLSelectElement>} />
                        <AuthSelect label="Experience Level" options={EXPERIENCE} placeholder="Choose one…"
                            value={f.exp} onChange={s("exp") as React.ChangeEventHandler<HTMLSelectElement>} />
                    </div>
                )}
                {role === "instructor" && (
                    <div className="grid grid-cols-1 gap-4">
                        <AuthInput label="Current Role / Title" placeholder="Senior Drilling Engineer" value={f.org} onChange={s("org")} />
                        <AuthSelect label="Primary Specialization" options={SPECIALIZATIONS} placeholder="Choose one…"
                            value={f.spec} onChange={s("spec") as React.ChangeEventHandler<HTMLSelectElement>} />
                        <AuthSelect label="Years of Experience" options={EXPERIENCE.slice(1)} placeholder="Choose one…"
                            value={f.exp} onChange={s("exp") as React.ChangeEventHandler<HTMLSelectElement>} />
                    </div>
                )}
                {role === "company" && (
                    <div className="grid grid-cols-1 gap-4">
                        <AuthInput label="Company Name" placeholder="Sonatrach, TotalEnergies…" value={f.org} onChange={s("org")} />
                        <AuthSelect label="Company Size" options={COMPANY_SIZES} placeholder="Choose one…"
                            value={f.size} onChange={s("size") as React.ChangeEventHandler<HTMLSelectElement>} />
                    </div>
                )}

                <Button type="submit" size="lg" className="w-full shadow-gold-sm font-bold mt-2" isLoading={loading}
                    rightIcon={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}>
                    {!loading && "Create Account"}
                </Button>
            </form>
        </motion.div>
    );
}

/* ─── Step 3: Verify Email ─────────── */
function StepVerify() {
    const [resent, setResent] = useState(false);
    const handleResend = () => { setResent(true); setTimeout(() => setResent(false), 4000); };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
            className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-500 flex items-center justify-center mx-auto mb-6 relative">
                <Mail className="w-9 h-9 text-teal-400" />
                <motion.div initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.2, delay: 0.4, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-teal-500" />
            </motion.div>

            <h2 className="font-display text-2xl text-white mb-3">Check your inbox</h2>
            <p className="text-navy-300 text-sm mb-1">We sent a verification link to your email.</p>
            <p className="text-white font-semibold text-sm mb-8">Click the link to activate your account.</p>

            <div className="bg-navy-800/60 border border-navy-700 rounded-xl p-4 text-left mb-6 space-y-2.5 max-w-sm mx-auto">
                {["Link expires in 24 hours", "Check your spam/junk folder", "Contact support@helm-academy.dz for help"].map(tip => (
                    <p key={tip} className="text-xs text-navy-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />{tip}
                    </p>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {resent ? (
                    <motion.p key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-sm text-teal-400 mb-4 font-medium">✓ Verification email resent!</motion.p>
                ) : (
                    <motion.button key="btn" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleResend}
                        className="text-sm text-navy-500 hover:text-primary transition-colors mb-4 block mx-auto">
                        Didn&apos;t receive it? Resend email
                    </motion.button>
                )}
            </AnimatePresence>

            <Link href="/auth/login">
                <Button variant="outline" className="mx-auto">Back to Sign In</Button>
            </Link>
        </motion.div>
    );
}

/* ─── Main Page ────────────────────── */
export default function AuthRegisterPage() {
    const [step, setStep] = useState<Step>(1);
    const [role, setRole] = useState<Role>(null);

    const handleRoleSelect = (r: Role) => { setRole(r); setStep(2); };
    const handleFormNext = () => setStep(3);
    const handleBack = () => setStep(prev => (prev - 1) as Step);

    return (
        <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: "linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="relative z-10 w-full max-w-2xl">
                {/* Logo */}
                <div className="flex items-center gap-2.5 justify-center mb-10">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-gold-sm">
                        <span className="font-display font-bold text-navy-950">H</span>
                    </div>
                    <span className="font-display text-xl text-white">HELM Academy</span>
                </div>

                {/* Card */}
                <div className="bg-navy-900/80 border border-navy-700 rounded-2xl p-6 md:p-10 backdrop-blur-xl">
                    <ProgressBar step={step} onStepClick={s => setStep(s)} />

                    <AnimatePresence mode="wait">
                        {step === 1 && <StepRole key="role" onSelect={handleRoleSelect} />}
                        {step === 2 && <StepForm key="form" role={role} onNext={handleFormNext} onBack={handleBack} />}
                        {step === 3 && <StepVerify key="verify" />}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
