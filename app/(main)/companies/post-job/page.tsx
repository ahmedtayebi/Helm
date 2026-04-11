"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, Eye, MapPin, Briefcase, DollarSign, Calendar, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JOB_TYPE_STYLES } from "@/data/jobs";

const STEPS = ["Job Details", "Requirements", "Company Info", "Preview & Publish"];

const SPECIALIZATIONS = ["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics", "Geoscience", "Facilities"];
const JOB_TYPES = ["Full-time", "Contract", "Internship"];
const EXPERIENCE_LEVELS = ["Entry-level", "Mid-level", "Senior", "Executive"];

interface FormData {
    // Step 1
    title: string; description: string; type: string; specialization: string;
    location: string; isRemote: boolean; deadline: string;
    showSalary: boolean; salaryMin: string; salaryMax: string;
    experienceLevel: string;
    // Step 2
    requirements: string; responsibilities: string; benefits: string;
    // Step 3
    companyName: string; companyWebsite: string; companySize: string; companyDesc: string;
}

function ProgressBar({ step }: { step: number }) {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
                {STEPS.map((label, idx) => (
                    <React.Fragment key={label}>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                                idx < step ? 'bg-primary border-primary text-navy-950'
                                : idx === step ? 'border-primary text-primary bg-primary/10'
                                : 'border-slate-300 dark:border-navy-600 text-slate-400 dark:text-navy-500 bg-white dark:bg-navy-900'
                            }`}>
                                {idx < step ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`hidden md:block text-sm font-medium ${idx <= step ? 'text-[#0D1B2A] dark:text-white' : 'text-slate-400 dark:text-navy-500'}`}>{label}</span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`flex-1 mx-3 h-px transition-all duration-500 ${idx < step ? 'bg-primary' : 'bg-slate-200 dark:bg-navy-700'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

function JobPreviewCard({ form }: { form: FormData }) {
    const typeStyle = JOB_TYPE_STYLES[(form.type as keyof typeof JOB_TYPE_STYLES) || "Full-time"];
    return (
        <div className="bg-white dark:bg-navy-900 border border-primary/30 rounded-2xl p-5 shadow-gold-sm relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="text-xs text-primary font-medium uppercase tracking-wide mb-3 flex items-center gap-2"><Eye className="w-3.5 h-3.5"/> Live Preview</p>
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
                    {(form.companyName || "CO").charAt(0)}
                </div>
                <div>
                    <h3 className="font-display text-base text-[#0D1B2A] dark:text-white leading-tight">{form.title || "Job Title"}</h3>
                    <p className="text-slate-500 dark:text-navy-400 text-xs">{form.companyName || "Your Company"}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
                {form.location && (
                    <span className="flex items-center gap-1 text-slate-500 dark:text-navy-400"><MapPin className="w-3 h-3"/>{form.location}</span>
                )}
                <span className={`px-2 py-0.5 rounded-full border font-medium ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                    {form.type || "Full-time"}
                </span>
                {form.experienceLevel && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-navy-300">{form.experienceLevel}</span>
                )}
                {form.isRemote && <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">Remote OK</span>}
            </div>
            {form.showSalary && form.salaryMin && (
                <div className="text-xs text-primary font-medium mb-3 flex items-center gap-1">
                    <DollarSign className="w-3 h-3"/> {form.salaryMin}{form.salaryMax ? ` – ${form.salaryMax}` : "+"} /month
                </div>
            )}
            {form.deadline && (
                <div className="text-xs text-slate-500 dark:text-navy-500 flex items-center gap-1"><Calendar className="w-3 h-3"/> Closes {new Date(form.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
            )}
        </div>
    );
}

export default function PostJobPage() {
    const [step, setStep] = useState(0);
    const [published, setPublished] = useState(false);
    const [form, setForm] = useState<FormData>({
        title: "", description: "", type: "Full-time", specialization: "",
        location: "", isRemote: false, deadline: "", showSalary: false,
        salaryMin: "", salaryMax: "", experienceLevel: "Mid-level",
        requirements: "", responsibilities: "", benefits: "",
        companyName: "", companyWebsite: "", companySize: "", companyDesc: "",
    });

    const set = (key: keyof FormData, val: string | boolean) => setForm(p => ({ ...p, [key]: val }));
    const fieldClass = "w-full bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl px-4 py-3 text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 text-sm focus:outline-none focus:border-primary transition-colors";
    const labelClass = "block text-sm font-medium text-slate-600 dark:text-navy-300 mb-1.5";

    if (published) {
        return (
            <main className="min-h-screen bg-white dark:bg-navy-950 pt-24 flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center bg-white dark:bg-navy-900 border border-primary/30 rounded-3xl p-10">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl text-[#0D1B2A] dark:text-white mb-3">Job Published!</h2>
                    <p className="text-slate-600 dark:text-navy-300 mb-2">Your listing for <strong className="text-[#0D1B2A] dark:text-white">{form.title}</strong> is now live on HELM.</p>
                    <p className="text-sm text-slate-400 dark:text-navy-500 mb-8">Qualified candidates will start applying within 24 hours.</p>
                    <div className="flex flex-col gap-3">
                        <Link href="/explore/career/jobs"><Button className="w-full">View Live Listing</Button></Link>
                        <Button variant="outline" onClick={() => { setPublished(false); setStep(0); setForm(f => ({ ...f, title: "", description: "" })); }} className="w-full">Post Another Job</Button>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-navy-950 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 xl:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-navy-400 mb-8">
                    <Link href="/companies" className="hover:text-primary transition-colors">Companies</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">Post a Job</span>
                </div>

                <div className="mb-8">
                    <h1 className="font-display text-4xl text-[#0D1B2A] dark:text-white">Post a Job</h1>
                    <p className="text-slate-600 dark:text-navy-300 mt-2">Reach 12,400+ qualified petroleum engineers in minutes</p>
                </div>

                <ProgressBar step={step} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    {/* Form */}
                    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-600 rounded-2xl p-6 md:p-8">

                        {/* ── STEP 1: Job Details ── */}
                        {step === 0 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                <h2 className="font-display text-2xl text-[#0D1B2A] dark:text-white mb-6 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/>Job Details</h2>
                                <div>
                                    <label className={labelClass}>Job Title *</label>
                                    <Input required placeholder="e.g. Senior Drilling Engineer" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.title} onChange={e => set("title", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Job Description *</label>
                                    <textarea rows={6} placeholder="Describe the role, what the engineer will do day-to-day, and what makes this opportunity exciting..." className={fieldClass} value={form.description} onChange={e => set("description", e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>Job Type *</label>
                                        <select className={fieldClass} value={form.type} onChange={e => set("type", e.target.value)}>
                                            {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Specialization *</label>
                                        <select className={fieldClass} value={form.specialization} onChange={e => set("specialization", e.target.value)}>
                                            <option value="">Select specialization</option>
                                            {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>Location *</label>
                                        <Input placeholder="e.g. Hassi Messaoud, Algeria" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.location} onChange={e => set("location", e.target.value)} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Experience Level</label>
                                        <select className={fieldClass} value={form.experienceLevel} onChange={e => set("experienceLevel", e.target.value)}>
                                            {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${form.isRemote ? 'bg-teal-500 border-teal-500' : 'bg-white dark:bg-navy-900 border-slate-300 dark:border-navy-600'}`}
                                        onClick={() => set("isRemote", !form.isRemote)}>
                                        {form.isRemote && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-navy-300">Remote / Hybrid work accepted</span>
                                </label>
                                <div>
                                    <label className={labelClass}>Application Deadline</label>
                                    <Input type="date" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.deadline} onChange={e => set("deadline", e.target.value)} />
                                </div>
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer mb-4">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${form.showSalary ? 'bg-primary border-primary' : 'bg-white dark:bg-navy-900 border-slate-300 dark:border-navy-600'}`}
                                            onClick={() => set("showSalary", !form.showSalary)}>
                                            {form.showSalary && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 dark:text-navy-300">Show salary range (increases applications by 40%)</span>
                                    </label>
                                    {form.showSalary && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-slate-500 dark:text-navy-400 mb-1 block">Min</label>
                                                <Input placeholder="e.g. 150,000 DZD" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.salaryMin} onChange={e => set("salaryMin", e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 dark:text-navy-400 mb-1 block">Max</label>
                                                <Input placeholder="e.g. 200,000 DZD" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.salaryMax} onChange={e => set("salaryMax", e.target.value)} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 2: Requirements ── */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                <h2 className="font-display text-2xl text-[#0D1B2A] dark:text-white mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary"/>Requirements & Responsibilities</h2>
                                <div>
                                    <label className={labelClass}>Requirements *</label>
                                    <p className="text-xs text-slate-500 dark:text-navy-500 mb-2">One per line (e.g. &ldquo;5+ years drilling experience&rdquo;)</p>
                                    <textarea rows={6} placeholder={"B.Sc. in Petroleum Engineering\n5+ years directional drilling experience\nIWCF Well Control certification"} className={fieldClass} value={form.requirements} onChange={e => set("requirements", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Key Responsibilities *</label>
                                    <p className="text-xs text-slate-500 dark:text-navy-500 mb-2">What will the engineer do day-to-day?</p>
                                    <textarea rows={6} placeholder={"Design and execute directional well programs\nMonitor real-time drilling data\nCoordinate with rig supervisors"} className={fieldClass} value={form.responsibilities} onChange={e => set("responsibilities", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Benefits & Perks</label>
                                    <textarea rows={4} placeholder={"Housing allowance\nMedical insurance\nAnnual flight ticket\nPerformance bonus"} className={fieldClass} value={form.benefits} onChange={e => set("benefits", e.target.value)} />
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 3: Company Info ── */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                                <h2 className="font-display text-2xl text-[#0D1B2A] dark:text-white mb-6 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary"/>Company Information</h2>
                                <div>
                                    <label className={labelClass}>Company Name *</label>
                                    <Input required placeholder="e.g. Sonatrach" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.companyName} onChange={e => set("companyName", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Company Website</label>
                                    <Input placeholder="https://www.yourcompany.com" className="bg-white dark:bg-navy-800 border-slate-300 dark:border-navy-600 focus:border-primary" value={form.companyWebsite} onChange={e => set("companyWebsite", e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelClass}>Company Size</label>
                                    <select className={fieldClass} value={form.companySize} onChange={e => set("companySize", e.target.value)}>
                                        <option value="">Select size</option>
                                        <option value="1–50">1–50 employees</option>
                                        <option value="51–200">51–200 employees</option>
                                        <option value="201–1000">201–1,000 employees</option>
                                        <option value="1000+">1,000+ employees</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>About Your Company</label>
                                    <textarea rows={5} placeholder="Tell engineers about your company mission, values, and what makes it a great place to work..." className={fieldClass} value={form.companyDesc} onChange={e => set("companyDesc", e.target.value)} />
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 4: Preview ── */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <h2 className="font-display text-2xl text-[#0D1B2A] dark:text-white mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/>Review & Publish</h2>
                                <div className="space-y-4 mb-8">
                                    {[
                                        { label: "Job Title", val: form.title },
                                        { label: "Company", val: form.companyName },
                                        { label: "Location", val: form.location + (form.isRemote ? " (Remote OK)" : "") },
                                        { label: "Type", val: form.type },
                                        { label: "Specialization", val: form.specialization },
                                        { label: "Experience Level", val: form.experienceLevel },
                                    ].map(({ label, val }) => (
                                        <div key={label} className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-navy-700">
                                            <span className="text-sm text-slate-500 dark:text-navy-400">{label}</span>
                                            <span className="text-sm text-[#0D1B2A] dark:text-white font-medium">{val || <span className="text-slate-400 dark:text-navy-600 italic">Not set</span>}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                                    <p className="text-sm text-slate-600 dark:text-navy-200 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0"/>
                                        Your job will be reviewed by our team and go live within 2 hours of submission.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-navy-700">
                            <Button variant="secondary" onClick={() => setStep(s => s - 1)} disabled={step === 0} size="md">← Previous</Button>
                            {step < 3 ? (
                                <Button onClick={() => setStep(s => s + 1)} size="md">Next Step →</Button>
                            ) : (
                                <Button onClick={() => setPublished(true)} size="md" className="shadow-gold-sm font-bold px-8">🚀 Publish Job</Button>
                            )}
                        </div>
                    </div>

                    {/* Live Preview Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="text-xs text-slate-500 dark:text-navy-500 uppercase tracking-wider font-medium mb-3">Live Card Preview</p>
                            <JobPreviewCard form={form} />
                            <div className="mt-4 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-600 rounded-xl p-4 text-xs text-slate-500 dark:text-navy-400 space-y-2">
                                <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-teal-400"/>Visible to all 12,400+ engineers</p>
                                <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-teal-400"/>Appears in email digests</p>
                                <p className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-teal-400"/>Stays live until deadline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
