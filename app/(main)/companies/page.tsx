"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users, Building2, TrendingUp, BarChart3, ShieldCheck, HeadphonesIcon,
    CheckCircle, Star, ArrowRight, Mail, Phone, Globe,
    Award, Zap, Target, BookOpen, Briefcase, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThemeColors } from "@/lib/useThemeColors";

const STATS = [
    { value: "12,400+", label: "Verified Engineers", icon: Users },
    { value: "50+", label: "Partner Companies", icon: Building2 },
    { value: "94%", label: "Placement Rate", icon: TrendingUp },
    { value: "200+", label: "Corporate Trainings", icon: BookOpen },
];

const VALUE_PROPS = [
    {
        icon: ShieldCheck,
        title: "Verified Talent Pool",
        description: "Every engineer on HELM has completed structured learning paths and skills assessments — so you interview candidates who are genuinely qualified.",
        color: "from-primary/20 to-primary/5",
        accent: "text-primary",
        border: "border-primary/25",
    },
    {
        icon: BookOpen,
        title: "Industry-Specific Training",
        description: "Commission bespoke learning programs for your team — from IWCF completion to reservoir simulation bootcamps — all tracked in real time.",
        color: "from-teal-500/15 to-teal-500/5",
        accent: "text-teal-400",
        border: "border-teal-500/25",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Monitor your team's progress, completion rates, and competency gaps with a dedicated corporate analytics panel updated in real time.",
        color: "from-purple-500/15 to-purple-500/5",
        accent: "text-purple-400",
        border: "border-purple-500/25",
    },
    {
        icon: HeadphonesIcon,
        title: "Dedicated Support",
        description: "A named HELM account manager is available Mon–Fri to handle your postings, training requests, and talent enquiries with SLA-backed response times.",
        color: "from-orange-500/15 to-orange-500/5",
        accent: "text-orange-400",
        border: "border-orange-500/25",
    },
];

const HOW_IT_WORKS = [
    { step: "01", icon: Building2, title: "Create Your Company Account", desc: "Register in minutes. One of our account managers will verify your company and set up your dashboard within 24 hours." },
    { step: "02", icon: Briefcase, title: "Post Jobs or Commission Training", desc: "Publish open roles to 12,400+ qualified engineers — or work with our content team to create a bespoke training programme." },
    { step: "03", icon: Target, title: "Hire or Track Progress", desc: "Receive curated candidate shortlists or monitor your team's real-time certification progress from your analytics dashboard." },
];

const COMPANY_LOGOS = [
    "Sonatrach", "TotalEnergies", "SLB", "Halliburton", "BP Algeria",
    "Repsol", "ENI Algeria", "QatarEnergy", "ADNOC", "KOC",
];

const PRICING = [
    {
        tier: "Basic",
        price: "Free",
        period: "",
        desc: "Perfect for small teams and initial exploration.",
        cta: "Get Started",
        variant: "outline" as const,
        features: [
            "2 active job postings",
            "Access to 100 public engineer profiles",
            "Basic candidate search",
            "Email support",
        ],
        missing: ["Analytics dashboard", "Talent database unlock", "Custom training", "Dedicated account manager"],
    },
    {
        tier: "Professional",
        price: "$490",
        period: "/month",
        desc: "For growing teams actively recruiting in petroleum.",
        cta: "Start Free Trial",
        variant: "primary" as const,
        isPopular: true,
        features: [
            "20 active job postings",
            "Full talent database access (100 unlocks/mo)",
            "Advanced search & filters",
            "Company branding on listings",
            "Analytics dashboard",
            "Priority email & chat support",
        ],
        missing: ["Custom training programmes", "Dedicated account manager"],
    },
    {
        tier: "Enterprise",
        price: "Custom",
        period: "",
        desc: "Tailored for large operators, NOCs, and service companies.",
        cta: "Contact Sales",
        variant: "secondary" as const,
        features: [
            "Unlimited job postings",
            "Unlimited talent unlocks",
            "Custom training programmes",
            "White-label certificate branding",
            "Real-time team analytics",
            "Dedicated account manager",
            "SLA-backed support",
            "API access",
        ],
        missing: [],
    },
];

const TESTIMONIAL = {
    quote: "We partnered with HELM to train 40 junior reservoir engineers over 3 months. The completion rate was 96% and the quality of the content matched what we'd expect from a top-tier service company. The analytics dashboard saved our L&D team hours of manual reporting.",
    name: "Salima Benali",
    role: "Talent & Learning Manager",
    company: "Sonatrach R&D Division",
    initials: "SB",
};

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function CompaniesPage() {
    const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const t = useThemeColors();

    const handleContact = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className={`min-h-screen ${t.sectionBgAlt} overflow-x-hidden`}>

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
                    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
                </div>

                <div className="relative max-w-6xl mx-auto px-4 xl:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeUp}>
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                                <Building2 className="w-4 h-4" /> For Companies & Operators
                            </div>
                            <h1 className={`font-display text-5xl md:text-6xl xl:text-7xl ${t.heading} leading-[1.08] mb-6`}>
                                Find & Develop<br />
                                <span className="text-gradient-gold">Top Petroleum</span><br />
                                Talent
                            </h1>
                            <p className={`${t.body} text-xl leading-relaxed mb-8 max-w-lg`}>
                                HELM connects Algeria&apos;s leading energy companies with 12,400+ verified petroleum engineers — and provides the training infrastructure to develop the ones you already have.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/companies/post-job">
                                    <Button size="xl" className="shadow-gold-lg text-base font-bold px-8 w-full sm:w-auto">
                                        Post a Job <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/companies/training-solutions">
                                    <Button size="xl" variant="outline" className={`text-base px-8 w-full sm:w-auto ${t.borderFaint} hover:border-primary`}>
                                        Explore Training Solutions
                                    </Button>
                                </Link>
                            </div>
                            <div className={`flex flex-wrap gap-5 mt-10 text-xs ${t.subtle}`}>
                                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> ISO 27001 Compliant</span>
                                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> Accredited Content</span>
                                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-purple-400" /> 24h Activation</span>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="hidden lg:grid grid-cols-2 gap-4">
                            {STATS.map(({ value, label, icon: Icon }, idx) => (
                                <div key={label} className={`${t.isDark ? "bg-navy-900/80" : "bg-white/80"} border ${t.borderAccent} rounded-2xl p-6 backdrop-blur ${idx === 0 ? 'border-primary/30 bg-primary/5' : ''}`}>
                                    <Icon className={`w-8 h-8 mb-4 ${idx === 0 ? 'text-primary' : t.subtle}`} />
                                    <p className={`font-display text-3xl xl:text-4xl ${t.heading} font-bold`}>{value}</p>
                                    <p className={`${t.subtle} text-sm mt-1`}>{label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR (mobile) ───────────────────────────────────── */}
            <section className={`lg:hidden border-t border-b ${t.borderSubtle} ${t.isDark ? "bg-navy-900/50" : "bg-slate-50/50"} py-8 px-4`}>
                <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <p className="font-display text-3xl text-primary font-bold">{value}</p>
                            <p className={`${t.subtle} text-sm`}>{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHY HELM ─────────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why HELM</p>
                        <h2 className={`font-display text-4xl md:text-5xl ${t.heading} mb-4`}>Built for the Energy Industry</h2>
                        <p className={`${t.muted} text-lg max-w-2xl mx-auto`}>Unlike generalist platforms, HELM was designed from the ground up for petroleum engineering — giving you unparalleled precision in both recruitment and training.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {VALUE_PROPS.map((vp, idx) => {
                            const Icon = vp.icon;
                            return (
                                <motion.div key={vp.title} {...fadeUp} transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative p-6 rounded-2xl bg-gradient-to-br ${vp.color} border ${vp.border} group hover:scale-[1.01] transition-transform duration-300`}>
                                    <div className={`w-12 h-12 rounded-xl ${t.isDark ? "bg-navy-950/60" : "bg-white/60"} border ${vp.border} flex items-center justify-center mb-4`}>
                                        <Icon className={`w-6 h-6 ${vp.accent}`} />
                                    </div>
                                    <h3 className={`font-display text-xl ${t.heading} mb-2`}>{vp.title}</h3>
                                    <p className={`${t.body} text-sm leading-relaxed`}>{vp.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
            <section className={`py-20 px-4 ${t.isDark ? "bg-navy-900/30" : "bg-slate-50/60"} border-t border-b ${t.borderSubtle}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Process</p>
                        <h2 className={`font-display text-4xl md:text-5xl ${t.heading}`}>Up and running in 24 hours</h2>
                    </motion.div>
                    <div className="relative">
                        <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-primary/30 via-teal-400/40 to-purple-400/30" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {HOW_IT_WORKS.map((item, idx) => {
                                const Icon = item.icon;
                                const accent = idx === 0 ? 'text-primary border-primary/40 bg-primary/10' : idx === 1 ? 'text-teal-400 border-teal-400/40 bg-teal-500/10' : 'text-purple-400 border-purple-400/40 bg-purple-500/10';
                                return (
                                    <motion.div key={item.step} {...fadeUp} transition={{ delay: idx * 0.15 }} className="flex flex-col items-center text-center">
                                        <div className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center mb-6 ${accent}`}>
                                            <Icon className="w-10 h-10" />
                                            <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${t.sectionBgAlt} border ${t.borderAccent} text-xs font-bold ${t.body} flex items-center justify-center`}>{item.step}</span>
                                        </div>
                                        <h3 className={`font-display text-xl ${t.heading} mb-2`}>{item.title}</h3>
                                        <p className={`${t.muted} text-sm leading-relaxed`}>{item.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURED COMPANIES ───────────────────────────────────── */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-10">
                        <p className={`${t.subtle} text-sm uppercase tracking-widest font-medium mb-6`}>Trusted by leading energy companies</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {COMPANY_LOGOS.map((co) => (
                                <div key={co} className={`h-14 ${t.cardBg} border ${t.borderSubtle} rounded-xl flex items-center justify-center text-sm font-semibold transition-all hover:border-primary/40 ${t.isDark ? "hover:text-white text-navy-400" : "hover:text-[#0D1B2A] text-slate-400"} px-2 text-center cursor-default`}>
                                    {co}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── TESTIMONIAL ──────────────────────────────────────────── */}
            <section className={`py-16 px-4 border-t ${t.borderSubtle}`}>
                <div className="max-w-3xl mx-auto">
                    <motion.div {...fadeUp} className={`relative ${t.cardBg} border border-primary/20 rounded-3xl p-8 md:p-12 text-center`}>
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <div className="text-5xl text-primary/30 font-display leading-none mb-4">&ldquo;</div>
                        <blockquote className={`text-xl md:text-2xl ${t.heading} font-light leading-relaxed mb-8 italic`}>
                            {TESTIMONIAL.quote}
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-navy-950 font-bold text-lg">
                                {TESTIMONIAL.initials}
                            </div>
                            <div className="text-left">
                                <p className={`font-semibold ${t.heading}`}>{TESTIMONIAL.name}</p>
                                <p className={`text-sm ${t.subtle}`}>{TESTIMONIAL.role} · {TESTIMONIAL.company}</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-1 mt-5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-primary fill-primary" />)}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── PRICING ──────────────────────────────────────────────── */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Pricing</p>
                        <h2 className={`font-display text-4xl md:text-5xl ${t.heading} mb-4`}>Transparent, Scalable Plans</h2>
                        <p className={`${t.muted} text-lg`}>Start free. Scale as you hire.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {PRICING.map((plan, idx) => (
                            <motion.div key={plan.tier} {...fadeUp} transition={{ delay: idx * 0.1 }}
                                className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all ${
                                    plan.isPopular
                                        ? `border-primary ${t.cardBg} shadow-gold-md`
                                        : `${t.borderAccent} ${t.cardBg} ${t.isDark ? "hover:border-navy-400" : "hover:border-slate-400"}`
                                }`}>
                                {plan.isPopular && (
                                    <>
                                        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-gold text-navy-950 text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                                    </>
                                )}
                                <div className="mb-6">
                                    <h3 className={`font-display text-2xl ${t.heading} mb-1`}>{plan.tier}</h3>
                                    <p className={`${t.subtle} text-sm mb-4`}>{plan.desc}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`font-display text-4xl ${t.heading} font-bold`}>{plan.price}</span>
                                        {plan.period && <span className={`${t.subtle} text-sm`}>{plan.period}</span>}
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-6 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className={`flex items-center gap-2.5 text-sm ${t.body}`}>
                                            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                    {plan.missing.map(f => (
                                        <li key={f} className={`flex items-center gap-2.5 text-sm ${t.isDark ? "text-navy-600" : "text-slate-300"} line-through`}>
                                            <CheckCircle className={`w-4 h-4 ${t.isDark ? "text-navy-700" : "text-slate-300"} flex-shrink-0`} /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant={plan.variant} size="md" className={`w-full ${plan.isPopular ? 'shadow-gold-sm' : ''}`}>
                                    {plan.cta}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA / CONTACT ──────────────────────────────────── */}
            <section className={`py-24 px-4 border-t ${t.borderSubtle} ${t.isDark ? "bg-navy-900/30" : "bg-slate-50/60"}`} id="contact">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div {...fadeUp}>
                            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Get in Touch</p>
                            <h2 className={`font-display text-4xl md:text-5xl ${t.heading} mb-6`}>Ready to Partner<br />with HELM?</h2>
                            <p className={`${t.body} text-lg leading-relaxed mb-8`}>
                                Whether you want to post your first job today or discuss a custom training programme for 500 engineers, our team is ready.
                            </p>
                            <div className="space-y-4 text-sm">
                                <a href="mailto:partnerships@helm-academy.dz" className={`flex items-center gap-3 ${t.muted} hover:text-primary transition-colors group`}>
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    partnerships@helm-academy.dz
                                </a>
                                <a href="tel:+21321000000" className={`flex items-center gap-3 ${t.muted} hover:text-primary transition-colors group`}>
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    +213 21 000 000
                                </a>
                                <p className={`flex items-center gap-3 ${t.muted}`}>
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-primary" />
                                    </div>
                                    Mon–Fri · 08:00 – 18:00 (CET)
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
                            {submitted ? (
                                <div className={`${t.cardBg} border border-teal-500/30 rounded-2xl p-10 text-center`}>
                                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-teal-400" />
                                    </div>
                                    <h3 className={`font-display text-2xl ${t.heading} mb-2`}>Message Sent!</h3>
                                    <p className={t.muted}>Our partnerships team will respond within 1 business day.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContact} className={`${t.cardBg} border ${t.borderAccent} rounded-2xl p-6 md:p-8 space-y-4`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-xs font-medium ${t.muted} mb-1.5`}>Full Name *</label>
                                            <Input required placeholder="Your name" className={`${t.inputBg} ${t.borderAccent} focus:border-primary`} value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className={`block text-xs font-medium ${t.muted} mb-1.5`}>Company *</label>
                                            <Input required placeholder="Company name" className={`${t.inputBg} ${t.borderAccent} focus:border-primary`} value={contactForm.company} onChange={e => setContactForm(p => ({ ...p, company: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-medium ${t.muted} mb-1.5`}>Work Email *</label>
                                        <Input required type="email" placeholder="you@company.com" className={`${t.inputBg} ${t.borderAccent} focus:border-primary`} value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-medium ${t.muted} mb-1.5`}>Phone (optional)</label>
                                        <Input type="tel" placeholder="+213 5XX XXX XXX" className={`${t.inputBg} ${t.borderAccent} focus:border-primary`} value={contactForm.phone} onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-medium ${t.muted} mb-1.5`}>How can we help? *</label>
                                        <textarea required rows={4} placeholder="Tell us about your hiring needs or training requirements..."
                                            className={`w-full ${t.inputBg} border ${t.borderAccent} rounded-xl px-4 py-3 ${t.heading} placeholder:${t.faint} text-sm focus:outline-none focus:border-primary resize-none transition-colors`}
                                            value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                                        />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full shadow-gold-sm font-bold">
                                        Send Message <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                    <p className={`text-xs ${t.faint} text-center`}>We typically respond within 4 business hours.</p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
