"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ChevronRight, MapPin, Building2,
    Upload, CheckCircle, Flame, Wifi, Timer, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_JOBS, JOB_TYPE_STYLES } from "@/data/jobs";

function daysUntil(isoDate: string) {
    return Math.max(0, Math.floor((new Date(isoDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
    const job = MOCK_JOBS.find(j => j.id === params.id) ?? MOCK_JOBS[0];
    const typeStyle = JOB_TYPE_STYLES[job.type];
    const deadlineDays = daysUntil(job.deadline);
    const isUrgent = deadlineDays <= 7;
    const similarJobs = MOCK_JOBS.filter(j => j.specialization === job.specialization && j.id !== job.id).slice(0, 3);

    const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "", fileName: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 xl:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-navy-400 mb-8 flex-wrap">
                    <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/explore/career/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-navy-200 truncate max-w-[200px]">{job.title}</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">

                        {/* Job Header Card */}
                        <div className="bg-navy-900 border border-navy-600 rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
                            {job.isFeatured && <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />}

                            <div className="flex items-start gap-5">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-navy-800 border border-navy-600 flex items-center justify-center text-2xl md:text-3xl font-display font-bold text-primary flex-shrink-0">
                                    {job.company.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {job.isHot && <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs"><Flame className="w-3 h-3 mr-1 inline"/>🔥 Hot Job</Badge>}
                                        {job.isFeatured && <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">⭐ Featured</Badge>}
                                    </div>
                                    <h1 className="font-display text-2xl md:text-3xl text-white">{job.title}</h1>
                                    <p className="text-navy-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-navy-500"/>{job.company}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-navy-500"/>{job.location}</span>
                                        {job.isRemote && <span className="flex items-center gap-1 text-teal-400"><Wifi className="w-3.5 h-3.5"/>Remote OK</span>}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>{job.type}</span>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-navy-800 text-navy-200 border-navy-600">{job.experienceLevel}</span>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-navy-800 text-navy-200 border-navy-600">{job.specialization}</span>
                                        {job.duration && <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-teal-500/10 text-teal-400 border-teal-500/30 flex items-center gap-1"><Timer className="w-3 h-3"/>{job.duration}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Stats bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-navy-700">
                                <div className="text-center">
                                    <p className="text-xs text-navy-400">Posted</p>
                                    <p className="text-sm text-white font-medium mt-1">
                                        {new Date(job.postedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-navy-400">Deadline</p>
                                    <p className={`text-sm font-medium mt-1 ${isUrgent ? 'text-red-400' : 'text-white'}`}>
                                        {isUrgent ? `⚡ ${deadlineDays}d left!` : `${deadlineDays} days left`}
                                    </p>
                                </div>
                                {job.salary && (
                                    <div className="text-center">
                                        <p className="text-xs text-navy-400">Compensation</p>
                                        <p className="text-sm text-primary font-medium mt-1 flex items-center justify-center gap-1">
                                            <DollarSign className="w-3 h-3"/>
                                            {job.salary.split(" ")[0]}
                                        </p>
                                    </div>
                                )}
                                {job.matchPercent && (
                                    <div className="text-center">
                                        <p className="text-xs text-navy-400">Profile Match</p>
                                        <p className="text-sm text-primary font-medium mt-1">{job.matchPercent}%</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-navy-900 border border-navy-600 rounded-2xl p-6 md:p-8 mb-6 space-y-8">
                            <div>
                                <h2 className="font-display text-xl text-white mb-4">About this Role</h2>
                                <p className="text-navy-200 leading-relaxed">{job.description}</p>
                            </div>

                            <div>
                                <h2 className="font-display text-xl text-white mb-4">Requirements</h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((r, i) => (
                                        <li key={i} className="flex items-start gap-3 text-navy-200">
                                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-display text-xl text-white mb-4">Key Responsibilities</h2>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((r, i) => (
                                        <li key={i} className="flex items-start gap-3 text-navy-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-display text-xl text-white mb-4">Benefits</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.benefits.map((b, i) => (
                                        <span key={i} className="text-sm text-navy-200 bg-navy-800 border border-navy-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                            <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Application Form */}
                        <div className="bg-navy-900 border border-primary/20 rounded-2xl p-6 md:p-8" id="apply">
                            <h2 className="font-display text-2xl text-white mb-6">Apply for this Position</h2>

                            {submitted ? (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="font-display text-2xl text-white mb-2">Application Submitted!</h3>
                                    <p className="text-navy-300">You&apos;ll receive a confirmation email at <strong className="text-white">{form.email}</strong>. Good luck! 🎯</p>
                                    <Link href="/explore/career/jobs">
                                        <Button variant="outline" className="mt-6">Browse More Jobs</Button>
                                    </Link>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-navy-300 mb-1.5">Full Name *</label>
                                            <Input
                                                required
                                                placeholder="Ahmed Tahir"
                                                className="bg-navy-800 border-navy-600 focus:border-primary"
                                                value={form.name}
                                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-navy-300 mb-1.5">Email Address *</label>
                                            <Input
                                                required
                                                type="email"
                                                placeholder="you@email.com"
                                                className="bg-navy-800 border-navy-600 focus:border-primary"
                                                value={form.email}
                                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Phone Number</label>
                                        <Input
                                            type="tel"
                                            placeholder="+213 5XX XXX XXX"
                                            className="bg-navy-800 border-navy-600 focus:border-primary"
                                            value={form.phone}
                                            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        />
                                    </div>

                                    {/* CV Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Upload CV (PDF) *</label>
                                        <label className="flex items-center justify-center gap-3 border-2 border-dashed border-navy-600 hover:border-primary/50 rounded-xl p-6 cursor-pointer transition-colors text-navy-400 hover:text-primary bg-navy-800/50 group">
                                            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">{form.fileName || "Click to upload or drag & drop"}</span>
                                            <input type="file" accept=".pdf" className="hidden" onChange={e => {
                                                const file = e.target.files?.[0];
                                                if (file) setForm(p => ({ ...p, fileName: file.name }));
                                            }} />
                                        </label>
                                        {form.fileName && (
                                            <p className="text-xs text-teal-400 mt-1.5 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3"/> {form.fileName} attached
                                            </p>
                                        )}
                                    </div>

                                    {/* Cover Letter */}
                                    <div>
                                        <label className="block text-sm font-medium text-navy-300 mb-1.5">Cover Letter</label>
                                        <textarea
                                            rows={5}
                                            placeholder={`Tell ${job.company} why you're the right fit for this ${job.title} role...`}
                                            className="w-full bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 text-white placeholder:text-navy-500 text-sm focus:outline-none focus:border-primary resize-none transition-colors"
                                            value={form.coverLetter}
                                            onChange={e => setForm(p => ({ ...p, coverLetter: e.target.value }))}
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full shadow-gold-md font-bold text-base">
                                        Submit Application →
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="xl:w-80 flex-shrink-0 space-y-5">

                        {/* Company Card */}
                        <div className="bg-navy-900 border border-navy-600 rounded-2xl p-5">
                            <h3 className="font-display text-lg text-white mb-4">About the Company</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-600 flex items-center justify-center font-display text-xl text-primary">
                                    {job.company.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{job.company}</p>
                                    <p className="text-xs text-navy-400">{job.specialization} Industry</p>
                                </div>
                            </div>
                            <p className="text-sm text-navy-300 leading-relaxed">
                                A leading energy company operating across the Algerian petroleum sector, known for its commitment to engineering excellence and sustainable operations.
                            </p>
                        </div>

                        {/* Deadline Widget */}
                        <div className={`border rounded-2xl p-5 ${isUrgent ? 'border-red-500/30 bg-red-500/5' : 'border-navy-600 bg-navy-900'}`}>
                            <h3 className="font-display text-lg text-white mb-3">Application Deadline</h3>
                            <p className={`text-2xl font-display font-bold mb-1 ${isUrgent ? 'text-red-400' : 'text-primary'}`}>
                                {deadlineDays === 0 ? "Today!" : `${deadlineDays} days`}
                            </p>
                            <p className="text-sm text-navy-300 mb-4">
                                {new Date(job.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                            <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (deadlineDays / 30) * 100)}%` }}
                                    transition={{ duration: 0.8 }}
                                    className={`h-full rounded-full ${isUrgent ? 'bg-red-500' : 'bg-primary'}`}
                                />
                            </div>
                            <Button
                                asChild
                                className={`w-full mt-4 font-bold ${isUrgent ? 'bg-red-500 hover:bg-red-600 border-red-600' : 'shadow-gold-sm'}`}
                            >
                                <a href="#apply">Quick Apply ↓</a>
                            </Button>
                        </div>

                        {/* Similar Jobs */}
                        {similarJobs.length > 0 && (
                            <div className="bg-navy-900 border border-navy-600 rounded-2xl p-5">
                                <h3 className="font-display text-lg text-white mb-4">Similar Jobs</h3>
                                <div className="space-y-3">
                                    {similarJobs.map(sj => (
                                        <Link key={sj.id} href={`/explore/career/jobs/${sj.id}`} className="block group">
                                            <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-800 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                                                    {sj.company.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">{sj.title}</p>
                                                    <p className="text-xs text-navy-400">{sj.company}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/explore/career/jobs" className="block text-center text-xs text-primary hover:underline mt-3">View all jobs →</Link>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
