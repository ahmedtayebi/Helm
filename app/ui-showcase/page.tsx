"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Palette, Type, Square, Tag, CreditCard, FormInput,
    Loader, Bell, Layers, BarChart2, ChevronRight,
    AlertTriangle, XCircle, Info, CheckCircle, Eye, EyeOff,
    Download, Star, BookOpen, Zap, ArrowRight, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCardSkeleton, StatCardSkeleton, ListItemSkeleton } from "@/components/ui/Skeleton";

/* ────────────────────────────────────────
   SECTION DEFINITIONS
──────────────────────────────────────── */
const SECTIONS = [
    { id: "colors",     icon: Palette,   label: "Color Palette" },
    { id: "typography", icon: Type,      label: "Typography" },
    { id: "buttons",    icon: Square,    label: "Buttons" },
    { id: "badges",     icon: Tag,       label: "Badges" },
    { id: "cards",      icon: CreditCard,label: "Cards" },
    { id: "forms",      icon: FormInput, label: "Form Elements" },
    { id: "loading",    icon: Loader,    label: "Loading States" },
    { id: "toasts",     icon: Bell,      label: "Toasts & Alerts" },
    { id: "modal",      icon: Layers,    label: "Modal" },
    { id: "progress",   icon: BarChart2, label: "Progress Bars" },
];

/* ────────────────────────────────────────
   SECTION WRAPPER
──────────────────────────────────────── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="mb-16 scroll-mt-8">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-navy-700">
                <h2 className="font-display text-2xl text-white">{title}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">{`#${id}`}</span>
            </div>
            {children}
        </section>
    );
}

function ShowBlock({ label, children, dark = true }: { label?: string; children: React.ReactNode; dark?: boolean }) {
    return (
        <div className="mb-6">
            {label && <p className="text-xs text-navy-500 font-mono mb-3 uppercase tracking-wider">{label}</p>}
            <div className={`rounded-xl border border-navy-700 p-6 flex flex-wrap gap-4 items-center ${dark ? "bg-navy-900" : "bg-navy-800"}`}>
                {children}
            </div>
        </div>
    );
}

/* ────────────────────────────────────────
   COLOR PALETTE
──────────────────────────────────────── */
const COLORS = [
    { name: "Primary",      groups: [
        { label: "primary-dark", hex: "#A07010", cls: "bg-[#A07010]" },
        { label: "primary",      hex: "#D4A017", cls: "bg-primary" },
        { label: "primary-light",hex: "#F5C518", cls: "bg-[#F5C518]" },
    ]},
    { name: "Navy",         groups: [
        { label: "navy-950", hex: "#060E1A", cls: "bg-navy-950" },
        { label: "navy-900", hex: "#0A1628", cls: "bg-navy-900" },
        { label: "navy-800", hex: "#0F2235", cls: "bg-navy-800" },
        { label: "navy-700", hex: "#1a2e47", cls: "bg-navy-700" },
        { label: "navy-600", hex: "#234060", cls: "bg-navy-600" },
        { label: "navy-500", hex: "#2D5378", cls: "bg-navy-500" },
        { label: "navy-400", hex: "#4A7A99", cls: "bg-navy-400" },
        { label: "navy-300", hex: "#7BADC5", cls: "bg-navy-300" },
        { label: "navy-200", hex: "#A8C8D8", cls: "bg-navy-200" },
    ]},
    { name: "Semantic",     groups: [
        { label: "success", hex: "#10b981", cls: "bg-[#10b981]" },
        { label: "danger",  hex: "#ef4444", cls: "bg-[#ef4444]" },
        { label: "accent",  hex: "#2DD4BF", cls: "bg-[#2DD4BF]" },
        { label: "warning", hex: "#f59e0b", cls: "bg-[#f59e0b]" },
    ]},
];

function ColorSection() {
    return (
        <Section id="colors" title="Color Palette">
            {COLORS.map(group => (
                <div key={group.name} className="mb-6">
                    <p className="text-xs text-navy-500 font-mono mb-3 uppercase tracking-wider">{group.name}</p>
                    <div className="flex flex-wrap gap-3">
                        {group.groups.map(c => (
                            <div key={c.label} className="flex flex-col items-center gap-1.5">
                                <div className={`w-14 h-14 rounded-xl border border-white/10 shadow-inner ${c.cls}`} />
                                <p className="text-[10px] text-navy-400 font-mono text-center leading-tight">{c.label}</p>
                                <p className="text-[9px] text-navy-600 font-mono">{c.hex}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Section>
    );
}

/* ────────────────────────────────────────
   TYPOGRAPHY
──────────────────────────────────────── */
function TypographySection() {
    return (
        <Section id="typography" title="Typography">
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 space-y-6">
                {[
                    { cls: "font-display text-5xl font-bold", label: "Display / H1",  text: "Engineer Your Future" },
                    { cls: "font-display text-4xl font-bold", label: "Display / H2",  text: "Petroleum Engineering" },
                    { cls: "font-display text-3xl font-semibold", label: "H3",        text: "Drilling Excellence" },
                    { cls: "font-display text-2xl font-semibold", label: "H4",        text: "Course Overview" },
                    { cls: "font-display text-xl",              label: "H5 — Display", text: "Section Heading" },
                    { cls: "font-body text-lg font-medium",     label: "Body Large",  text: "Industry-grade petroleum engineering education for professionals across MENA." },
                    { cls: "font-body text-base",               label: "Body",        text: "HELM Academy offers courses in drilling, reservoir, production, HSE, LNG, and economics." },
                    { cls: "font-body text-sm text-navy-300",   label: "Body Small",  text: "Enroll now to access 500+ professional-grade modules." },
                    { cls: "font-body text-xs text-navy-500",   label: "Caption",     text: "Posted Mar 2026 · 8 courses · 6 months" },
                    { cls: "font-mono text-sm text-primary",    label: "Mono",        text: "HELM-DE-2026-0001 · credential_id: 8a7f2c" },
                    { cls: "font-arabic text-xl text-right",    label: "Arabic / Cairo", text: "مرحباً بك في أكاديمية هيلم" },
                ].map(row => (
                    <div key={row.label} className="flex items-baseline gap-4 flex-wrap border-b border-navy-800 last:border-0 pb-4 last:pb-0">
                        <span className="text-[10px] font-mono text-navy-600 w-32 flex-shrink-0">{row.label}</span>
                        <span className={`text-white ${row.cls}`}>{row.text}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
}

/* ────────────────────────────────────────
   BUTTONS
──────────────────────────────────────── */
function ButtonsSection() {
    const variants = ["primary", "secondary", "outline", "ghost", "danger", "accent"] as const;
    const sizes = ["sm", "md", "lg", "xl"] as const;

    return (
        <Section id="buttons" title="Buttons">
            <ShowBlock label="Variants">
                {variants.map(v => <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>)}
            </ShowBlock>
            <ShowBlock label="Sizes (primary)">
                {sizes.map(s => <Button key={s} size={s}>Size {s}</Button>)}
            </ShowBlock>
            <ShowBlock label="With Icons">
                <Button leftIcon={<Download className="w-4 h-4" />}>Download</Button>
                <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
                <Button leftIcon={<Star className="w-4 h-4" />} rightIcon={<ChevronRight className="w-4 h-4" />}>Enroll Now</Button>
                <Button size="icon"><Zap className="w-4 h-4" /></Button>
            </ShowBlock>
            <ShowBlock label="States">
                <Button isLoading>Loading…</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Outline Disabled</Button>
            </ShowBlock>
        </Section>
    );
}

/* ────────────────────────────────────────
   BADGES
──────────────────────────────────────── */
function BadgesSection() {
    const variants = ["default", "secondary", "success", "warning", "danger", "accent", "outline"] as const;

    return (
        <Section id="badges" title="Badges">
            <ShowBlock label="Variants">
                {variants.map(v => <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
            </ShowBlock>
            <ShowBlock label="With Dot Indicator">
                {variants.map(v => <Badge key={v} variant={v} dot>{v}</Badge>)}
            </ShowBlock>
            <ShowBlock label="Sizes">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
            </ShowBlock>
            <ShowBlock label="Specialization Tags">
                {[
                    { l: "Drilling", cls: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
                    { l: "Reservoir", cls: "bg-teal-500/15 text-teal-400 border-teal-500/30" },
                    { l: "Production", cls: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
                    { l: "HSE", cls: "bg-green-500/15 text-green-400 border-green-500/30" },
                    { l: "LNG", cls: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
                    { l: "Economics", cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
                ].map(t => (
                    <span key={t.l} className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${t.cls}`}>{t.l}</span>
                ))}
            </ShowBlock>
        </Section>
    );
}

/* ────────────────────────────────────────
   CARDS
──────────────────────────────────────── */
function CardsSection() {
    return (
        <Section id="cards" title="Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Default */}
                <div className="bg-navy-900 border border-navy-700 rounded-xl p-5">
                    <p className="text-[10px] font-mono text-navy-600 mb-3">DEFAULT CARD</p>
                    <h3 className="font-display text-lg text-white mb-2">Well Control Fundamentals</h3>
                    <p className="text-sm text-navy-400 mb-4">A comprehensive introduction to blowout prevention and pressure control in drilling operations.</p>
                    <div className="flex gap-2">
                        <Badge variant="default">Drilling</Badge>
                        <Badge variant="secondary">Beginner</Badge>
                    </div>
                </div>

                {/* Glass */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)" }}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <p className="text-[10px] font-mono text-navy-600 mb-3">GLASS CARD</p>
                    <h3 className="font-display text-lg text-white mb-2">Reservoir Simulation</h3>
                    <p className="text-sm text-navy-400 mb-4">Eclipse and CMG simulation techniques for HPHT and multi-phase reservoir modeling.</p>
                    <div className="flex gap-2">
                        <Badge variant="accent">Reservoir</Badge>
                        <Badge variant="warning">Advanced</Badge>
                    </div>
                </div>

                {/* Featured / Gold border */}
                <div className="bg-navy-900 border-2 border-primary/40 rounded-xl p-5 shadow-[0_0_30px_rgba(212,160,23,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-primary text-navy-950 rounded-full">FEATURED</span>
                    <p className="text-[10px] font-mono text-navy-600 mb-3">FEATURED CARD</p>
                    <h3 className="font-display text-lg text-white mb-2">HSE Masterclass</h3>
                    <p className="text-sm text-navy-400 mb-4">Process safety management and HAZOP facilitation for senior engineers and team leads.</p>
                    <div className="flex gap-2">
                        <Badge variant="success">HSE</Badge>
                        <Badge variant="default" dot>Popular</Badge>
                    </div>
                </div>

                {/* Stat card */}
                <div className="bg-navy-900 border border-teal-500/25 rounded-xl p-5 bg-teal-500/5">
                    <p className="text-[10px] font-mono text-navy-600 mb-3">STAT CARD</p>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-teal-400" />
                        </div>
                        <span className="font-display text-3xl text-white font-bold">2,847</span>
                    </div>
                    <p className="text-sm text-navy-400">Total Enrolled Students</p>
                    <p className="text-xs text-teal-400 mt-1">↑ +12% this month</p>
                </div>
            </div>
        </Section>
    );
}

/* ────────────────────────────────────────
   FORM ELEMENTS
──────────────────────────────────────── */
function FormsSection() {
    const [showPass, setShowPass] = useState(false);
    const [val, setVal] = useState("");
    const inputBase = "w-full bg-navy-800 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-navy-500 focus:outline-none transition-all";

    return (
        <Section id="forms" title="Form Elements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-navy-900 border border-navy-700 rounded-xl p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Default State</label>
                        <input className={`${inputBase} border-navy-600`} placeholder="e.g. ahmed@helm.academy" />
                    </div>
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Focus State</label>
                        <input className={`${inputBase} border-primary ring-1 ring-primary/30`} placeholder="Focused input" defaultValue="typing..." />
                    </div>
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Success State</label>
                        <div className="relative">
                            <input className={`${inputBase} border-green-500/50 pr-10`} defaultValue="ahmed.hadjali@usthb.dz" readOnly />
                            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Error State</label>
                        <div className="relative">
                            <input className={`${inputBase} border-red-500/50 pr-10`} defaultValue="not-an-email" readOnly />
                            <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                        </div>
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Please enter a valid email address</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Password Input</label>
                        <div className="relative">
                            <input type={showPass ? "text" : "password"} className={`${inputBase} border-navy-600 pr-10`} defaultValue="mypassword123" />
                            <button onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-primary transition-colors">
                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Select Dropdown</label>
                        <select className={`${inputBase} border-navy-600 cursor-pointer`}>
                            <option value="">Select specialization…</option>
                            <option>Drilling Engineering</option>
                            <option>Reservoir Engineering</option>
                            <option>HSE Specialist</option>
                            <option>Petroleum Economics</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-navy-400 mb-1.5">Textarea</label>
                        <textarea rows={3} className={`${inputBase} border-navy-600 resize-none`} placeholder="Tell us about your background…" value={val} onChange={e => setVal(e.target.value)} />
                        <p className="text-[10px] text-navy-600 text-right mt-1">{val.length}/500</p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs text-navy-400">Checkbox & Radio</label>
                        {["Remember me", "Agree to Terms", "Subscribe to newsletter"].map((l, i) => (
                            <label key={l} className="flex items-center gap-2 cursor-pointer group">
                                <input type={i === 0 ? "checkbox" : "radio"} name="demo-radio" className="w-4 h-4 accent-primary" defaultChecked={i === 0} />
                                <span className="text-sm text-navy-300 group-hover:text-white transition-colors">{l}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

/* ────────────────────────────────────────
   LOADING STATES
──────────────────────────────────────── */
function LoadingSection() {
    return (
        <Section id="loading" title="Loading States">
            <ShowBlock label="Spinners">
                {["w-4 h-4", "w-6 h-6", "w-8 h-8", "w-10 h-10"].map(s => (
                    <div key={s} className={`${s} border-2 border-navy-700 border-t-primary rounded-full animate-spin`} />
                ))}
                <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </ShowBlock>
            <ShowBlock label="Pulse Dots">
                <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                </div>
                <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>
            </ShowBlock>
            <div>
                <p className="text-xs text-navy-500 font-mono mb-3 uppercase tracking-wider">Skeleton Variants</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CourseCardSkeleton />
                    <div className="space-y-3">
                        <ListItemSkeleton />
                        <ListItemSkeleton />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </div>
                </div>
            </div>
        </Section>
    );
}

/* ────────────────────────────────────────
   TOASTS & ALERTS
──────────────────────────────────────── */
function ToastsSection() {
    const ALERTS = [
        { type: "success", icon: CheckCircle, cls: "border-teal-500/40 bg-teal-500/10 text-teal-400", label: "Success", msg: "Course enrollment confirmed! You're all set." },
        { type: "error",   icon: XCircle,     cls: "border-red-500/40 bg-red-500/10 text-red-400",    label: "Error",   msg: "Payment failed. Please check your card details." },
        { type: "warning", icon: AlertTriangle,cls:"border-yellow-500/40 bg-yellow-500/10 text-yellow-400",label:"Warning",msg: "Your session is about to expire. Save your progress." },
        { type: "info",    icon: Info,         cls: "border-primary/40 bg-primary/10 text-primary",   label: "Info",    msg: "New course modules have been added to your track." },
    ];

    return (
        <Section id="toasts" title="Toasts & Alerts">
            <div className="space-y-3">
                {ALERTS.map(a => {
                    const Icon = a.icon;
                    return (
                        <div key={a.type} className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl bg-navy-900/90 ${a.cls}`}>
                            <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs font-bold mb-0.5">{a.label}</p>
                                <p className="text-sm text-white leading-snug">{a.msg}</p>
                            </div>
                            <button className="text-navy-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" /></button>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 bg-navy-900 border border-navy-700 rounded-xl p-4">
                <p className="text-xs text-navy-500 font-mono mb-2 uppercase tracking-wider">Usage — useToast hook</p>
                <pre className="text-xs text-teal-400 font-mono overflow-x-auto">{`import { useToast } from "@/components/ui/Toast";

const { toast } = useToast();
toast("Enrolled successfully!", "success");
toast("Payment failed", "error");
toast("Session expiring soon", "warning");
toast("New modules added", "info");`}</pre>
            </div>
        </Section>
    );
}

/* ────────────────────────────────────────
   MODAL
──────────────────────────────────────── */
function ModalSection() {
    const [open, setOpen] = useState(false);

    return (
        <Section id="modal" title="Modal">
            <ShowBlock label="Trigger">
                <Button onClick={() => setOpen(true)}>Open Modal Example</Button>
                <Button variant="outline" onClick={() => setOpen(true)}>Open Confirmation</Button>
            </ShowBlock>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-[150]"
                            onClick={() => setOpen(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -16 }} transition={{ type: "spring", damping: 28, stiffness: 400 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[160] px-4">
                            <div className="bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800">
                                    <h3 className="font-display text-lg text-white">Enroll in Course</h3>
                                    <button onClick={() => setOpen(false)} className="text-navy-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                                </div>
                                <div className="px-6 py-5">
                                    <p className="text-sm text-navy-300 mb-4">You&apos;re about to enroll in <strong className="text-white">Directional Drilling Masterclass</strong>. This course includes 8 modules and a final exam.</p>
                                    <div className="bg-navy-800 rounded-xl p-3 flex justify-between text-xs mb-4">
                                        <span className="text-navy-400">Duration</span><span className="text-white">6 weeks · Self-paced</span>
                                    </div>
                                    <div className="bg-navy-800 rounded-xl p-3 flex justify-between text-xs">
                                        <span className="text-navy-400">Price</span><span className="text-primary font-bold">4,900 DZD / month</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 px-6 pb-5">
                                    <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button className="flex-1" onClick={() => setOpen(false)}>Confirm Enrollment</Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Section>
    );
}

/* ────────────────────────────────────────
   PROGRESS BARS
──────────────────────────────────────── */
function ProgressSection() {
    const bars = [
        { label: "Course Completion",   value: 78, color: "bg-primary",    track: "bg-navy-800" },
        { label: "Quiz Score",          value: 92, color: "bg-teal-400",   track: "bg-navy-800" },
        { label: "Monthly Target",      value: 45, color: "bg-purple-400", track: "bg-navy-800" },
        { label: "Profile Completeness",value: 60, color: "bg-blue-400",   track: "bg-navy-800" },
        { label: "Skills Progress",     value: 33, color: "bg-red-400",    track: "bg-navy-800" },
    ];

    return (
        <Section id="progress" title="Progress Bars">
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 space-y-5">
                {bars.map(b => (
                    <div key={b.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-navy-300">{b.label}</span>
                            <span className="text-white font-bold">{b.value}%</span>
                        </div>
                        <div className={`h-2 ${b.track} rounded-full overflow-hidden`}>
                            <motion.div className={`h-full ${b.color} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${b.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }} />
                        </div>
                    </div>
                ))}
            </div>
            <ShowBlock label="Thin Variants">
                {[1, 1.5, 2, 3, 4].map(h => (
                    <div key={h} className="w-full">
                        <div className="h-px bg-navy-800 rounded-full mb-2 relative">
                            <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${h * 15}%`, height: `${h}px`, marginTop: `${-(h - 1) / 2}px` }} />
                        </div>
                    </div>
                ))}
                <div className="flex flex-wrap gap-3 w-full">
                    {[25, 50, 75, 100].map(p => (
                        <div key={p} className="flex-1 min-w-[60px]">
                            <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary-dark to-primary" style={{ width: `${p}%` }} />
                            </div>
                            <p className="text-[10px] text-navy-600 text-center mt-1">{p}%</p>
                        </div>
                    ))}
                </div>
            </ShowBlock>
        </Section>
    );
}

/* ────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────── */
export default function UIShowcasePage() {
    const [active, setActive] = useState("colors");

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );
        SECTIONS.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-navy-950 pt-16">
            {/* Dev Banner */}
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-center">
                <p className="text-xs text-yellow-400 font-mono">
                    🔧 <strong>DEV ONLY</strong> — UI Component Showcase · <code>/ui-showcase</code> · HELM Academy Design System
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sticky Sidebar */}
                    <aside className="hidden lg:block w-52 flex-shrink-0">
                        <div className="sticky top-6">
                            <p className="text-[10px] font-mono text-navy-600 uppercase tracking-widest mb-3">Components</p>
                            <nav className="space-y-0.5">
                                {SECTIONS.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <button key={s.id}
                                            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-all ${active === s.id
                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                : "text-navy-400 hover:text-white hover:bg-navy-800"}`}>
                                            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                            {s.label}
                                            {active === s.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                                        </button>
                                    );
                                })}
                            </nav>

                            <div className="mt-6 p-3 bg-navy-900 border border-navy-700 rounded-xl">
                                <p className="text-[10px] font-mono text-navy-600 mb-2">DESIGN TOKENS</p>
                                <div className="space-y-1 text-[10px] font-mono text-navy-500">
                                    <p>Primary: <span className="text-primary">#D4A017</span></p>
                                    <p>Accent: <span className="text-teal-400">#2DD4BF</span></p>
                                    <p>BG Dark: <span className="text-navy-300">#060E1A</span></p>
                                    <p>Radius: <span className="text-white">rounded-xl</span></p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <div className="mb-10">
                            <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded mb-3 inline-block">v1.0 · 2026</span>
                            <h1 className="font-display text-4xl text-white mb-2">HELM Design System</h1>
                            <p className="text-navy-400">Living style guide — all components, tokens, and patterns in one place.</p>
                        </div>

                        {/* Mobile section pills */}
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 lg:hidden scrollbar-hide">
                            {SECTIONS.map(s => (
                                <button key={s.id}
                                    onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${active === s.id ? "bg-primary text-navy-950 border-primary" : "border-navy-600 text-navy-400"}`}>
                                    {s.label}
                                </button>
                            ))}
                        </div>

                        <ColorSection />
                        <TypographySection />
                        <ButtonsSection />
                        <BadgesSection />
                        <CardsSection />
                        <FormsSection />
                        <LoadingSection />
                        <ToastsSection />
                        <ModalSection />
                        <ProgressSection />
                    </main>
                </div>
            </div>
        </div>
    );
}
