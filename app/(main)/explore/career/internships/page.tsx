"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, MapPin, ChevronRight,
    Flame, DollarSign, Timer, Building2, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_JOBS, Job } from "@/data/jobs";

function daysUntil(isoDate: string) {
    return Math.max(0, Math.floor((new Date(isoDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

function InternshipCard({ job }: { job: Job }) {
    const deadlineDays = daysUntil(job.deadline);
    const isUrgent = deadlineDays <= 7;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="group bg-navy-900 border border-navy-600 rounded-2xl p-6 hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(45,212,191,0.08)] transition-all duration-300"
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-lg font-display font-bold text-teal-400 flex-shrink-0">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        {job.isHot && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-1.5 py-0.5 rounded-full mb-1.5">
                                <Flame className="w-2.5 h-2.5" /> Hot
                            </span>
                        )}
                        <h3 className="font-display text-lg text-white group-hover:text-teal-400 transition-colors leading-tight">{job.title}</h3>
                        <p className="text-navy-300 text-sm">{job.company}</p>
                    </div>
                </div>

                {/* Paid/Unpaid badge */}
                <span className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    job.isPaid
                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                    : 'bg-navy-800 text-navy-400 border-navy-600'
                }`}>
                    <DollarSign className="w-3 h-3" />
                    {job.isPaid ? 'Paid' : 'Unpaid'}
                </span>
            </div>

            <p className="text-sm text-navy-300 leading-relaxed line-clamp-2 mb-4">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 text-xs text-navy-300">
                    <MapPin className="w-3.5 h-3.5 text-navy-500" /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-navy-800 text-navy-300">
                    <Timer className="w-3 h-3" /> {job.duration}
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-navy-800 text-navy-300">
                    <GraduationCap className="w-3 h-3" /> {job.industry}
                </span>
            </div>

            {job.salary && (
                <div className="text-xs text-primary font-medium mb-4 bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
                    💰 {job.salary}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${isUrgent ? 'text-red-400' : 'text-navy-400'}`}>
                    {isUrgent ? `⚡ Closes in ${deadlineDays}d – Apply fast!` : `${deadlineDays} days remaining`}
                </div>
                <Link href={`/explore/career/jobs/${job.id}`}>
                    <Button size="sm" variant="accent" className="text-xs font-bold">Apply Now →</Button>
                </Link>
            </div>
        </motion.div>
    );
}

export default function InternshipsPage() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ specialization: [] as string[], paid: null as boolean | null, duration: [] as string[] });

    const internships = useMemo(() => {
        let result = MOCK_JOBS.filter(j => j.type === "Internship");
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
        }
        if (filters.specialization.length) result = result.filter(j => filters.specialization.includes(j.specialization));
        if (filters.paid !== null) result = result.filter(j => j.isPaid === filters.paid);
        return result;
    }, [search, filters]);

    const toggleSpec = (val: string) => setFilters(prev => ({
        ...prev,
        specialization: prev.specialization.includes(val)
            ? prev.specialization.filter(v => v !== val)
            : [...prev.specialization, val]
    }));

    const specializations = ["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 xl:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-navy-400 mb-6">
                    <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/explore/career/jobs" className="hover:text-primary transition-colors">Career</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-teal-400">Internships</span>
                </div>

                {/* Hero Banner */}
                <div className="relative rounded-3xl overflow-hidden mb-10 border border-teal-500/20 bg-gradient-to-r from-teal-900/30 via-navy-900 to-navy-900 p-8 md:p-12">
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none"/>
                    <div className="absolute top-1/2 right-16 -translate-y-1/2 text-[8rem] opacity-5 leading-none">🎓</div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                            <GraduationCap className="w-4 h-4" /> Students & Fresh Graduates
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                            Launch Your <br /><span className="text-teal-400">Career Here</span>
                        </h1>
                        <p className="text-navy-200 text-lg max-w-xl mb-6">
                            Internship opportunities in leading oil & gas companies across Algeria. Gain real industry experience and build your professional network.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            <div className="bg-navy-900/50 border border-teal-500/20 rounded-xl px-4 py-2 text-center">
                                <p className="text-2xl font-display text-teal-400 font-bold">{MOCK_JOBS.filter(j => j.type === "Internship" && j.isPaid).length}</p>
                                <p className="text-xs text-navy-400">Paid Positions</p>
                            </div>
                            <div className="bg-navy-900/50 border border-navy-600 rounded-xl px-4 py-2 text-center">
                                <p className="text-2xl font-display text-white font-bold">{MOCK_JOBS.filter(j => j.type === "Internship").length}</p>
                                <p className="text-xs text-navy-400">Open Internships</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-56 flex-shrink-0 hidden lg:block">
                        <div className="glass p-5 rounded-2xl border border-navy-600 sticky top-24">
                            <h2 className="font-display text-lg text-white mb-5">Filters</h2>

                            <div className="mb-5">
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">Access</h3>
                                <div className="flex flex-col gap-2">
                                    {[{ label: "Paid", val: true }, { label: "Unpaid", val: false }].map(({ label, val }) => (
                                        <button key={label} onClick={() => setFilters(prev => ({ ...prev, paid: prev.paid === val ? null : val }))}
                                            className={`py-1.5 px-3 text-sm rounded-lg border text-left transition-all ${filters.paid === val ? 'bg-teal-500/10 border-teal-500/40 text-teal-400' : 'bg-navy-900 border-navy-600 text-navy-400 hover:text-white hover:border-navy-400'}`}>
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-5">
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">Specialization</h3>
                                <div className="space-y-2">
                                    {specializations.map(s => (
                                        <label key={s} onClick={() => toggleSpec(s)} className="flex items-center gap-2.5 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${filters.specialization.includes(s) ? 'bg-teal-500 border-teal-500' : 'bg-navy-900 border-navy-600 group-hover:border-teal-500/50'}`}>
                                                {filters.specialization.includes(s) && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                            </div>
                                            <span className={`text-sm ${filters.specialization.includes(s) ? 'text-teal-400' : 'text-navy-400 group-hover:text-white'} transition-colors`}>{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Listings */}
                    <div className="flex-1 min-w-0">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <Input placeholder="Search internships..." className="pl-12 h-12 bg-navy-900 border-navy-500 rounded-xl focus:border-teal-500 text-base" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>

                        <p className="text-sm text-navy-400 mb-4">{internships.length} internships found</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <AnimatePresence mode="popLayout">
                                {internships.length > 0 ? internships.map(job => (
                                    <InternshipCard key={job.id} job={job} />
                                )) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 py-20 text-center border border-dashed border-navy-600 rounded-2xl">
                                        <Building2 className="w-12 h-12 text-navy-600 mx-auto mb-4"/>
                                        <h3 className="text-white font-display text-xl mb-2">No internships found</h3>
                                        <p className="text-navy-400 text-sm">Check back soon or adjust your filters</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
