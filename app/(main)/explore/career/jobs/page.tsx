"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, MapPin, Briefcase, Filter, Flame, Star,
    Clock, ChevronRight, Building2, Wifi
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_JOBS, JOB_TYPE_STYLES, Job } from "@/data/jobs";

const SPECIALIZATIONS = ["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];
const EXPERIENCE_LEVELS = ["Entry-level", "Mid-level", "Senior", "Executive"];
const JOB_TYPES = ["Full-time", "Contract", "Internship"];

function daysAgo(isoDate: string) {
    const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff}d ago`;
}

function daysUntil(isoDate: string) {
    return Math.max(0, Math.floor((new Date(isoDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

function JobCard({ job, isSelected, onClick }: { job: Job; isSelected: boolean; onClick: () => void }) {
    const typeStyle = JOB_TYPE_STYLES[job.type];
    const deadlineDays = daysUntil(job.deadline);
    const isUrgent = deadlineDays <= 7;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={onClick}
            className={`relative group cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                isSelected
                    ? "border-primary bg-primary/5 shadow-gold-glow"
                    : job.isFeatured
                    ? "border-primary/40 bg-navy-900 hover:border-primary/70 hover:shadow-gold-sm"
                    : "border-navy-600 bg-navy-900 hover:border-navy-400 hover:bg-navy-800/60"
            }`}
        >
            {job.isFeatured && (
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            )}

            <div className="flex items-start gap-4">
                {/* Company Logo Placeholder */}
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-600 flex items-center justify-center flex-shrink-0 text-lg font-display font-bold text-primary">
                    {job.company.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {job.isHot && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-1.5 py-0.5 rounded-full">
                                        <Flame className="w-2.5 h-2.5" /> Hot
                                    </span>
                                )}
                                {job.isFeatured && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded-full">
                                        <Star className="w-2.5 h-2.5" /> Featured
                                    </span>
                                )}
                            </div>
                            <h3 className="font-display text-lg text-white leading-tight group-hover:text-primary transition-colors mt-1">
                                {job.title}
                            </h3>
                            <p className="text-navy-300 text-sm font-medium">{job.company}</p>
                        </div>

                        {job.matchPercent && (
                            <div className="flex-shrink-0 text-center">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/50 flex items-center justify-center relative">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                                        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-navy-700"/>
                                        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary"
                                            strokeDasharray={`${2 * Math.PI * 20 * job.matchPercent / 100} ${2 * Math.PI * 20}`}/>
                                    </svg>
                                    <span className="text-[10px] font-bold text-primary z-10">{job.matchPercent}%</span>
                                </div>
                                <p className="text-[9px] text-navy-400 mt-1">match</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 text-xs text-navy-300">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                            {job.isRemote && <span className="ml-1 px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-400 text-[10px] font-medium"><Wifi className="w-2.5 h-2.5 inline mr-0.5"/>Remote OK</span>}
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                            <Briefcase className="w-3 h-3" />
                            {job.type}
                        </span>
                        <span className="flex items-center gap-1 bg-navy-800 px-2 py-0.5 rounded-full text-[11px]">
                             {job.experienceLevel}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy-700/50">
                        <div className="flex items-center gap-3 text-xs text-navy-400">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/>{daysAgo(job.postedDate)}</span>
                            {isUrgent ? (
                                <span className="text-red-400 font-medium">⚡ Closes in {deadlineDays}d</span>
                            ) : (
                                <span>Closes in {deadlineDays}d</span>
                            )}
                        </div>
                        <Link
                            href={`/explore/career/jobs/${job.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-primary hover:text-white font-medium flex items-center gap-1 transition-colors"
                        >
                            Quick Apply <ChevronRight className="w-3.5 h-3.5"/>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function JobsPage() {
    const [search, setSearch] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(MOCK_JOBS[0]);
    const [filters, setFilters] = useState({
        type: [] as string[],
        specialization: [] as string[],
        experienceLevel: [] as string[],
        remoteOnly: false,
    });

    const toggle = (group: keyof Omit<typeof filters, "remoteOnly">, val: string) => {
        setFilters(prev => {
            const arr = prev[group] as string[];
            return { ...prev, [group]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
        });
    };

    const clearFilters = () => setFilters({ type: [], specialization: [], experienceLevel: [], remoteOnly: false });

    const totalFilters = filters.type.length + filters.specialization.length + filters.experienceLevel.length + (filters.remoteOnly ? 1 : 0);

    const jobs = useMemo(() => {
        // Only show full-time and contract (not internships) on this page
        let result = MOCK_JOBS.filter(j => j.type !== "Internship");
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.specialization.toLowerCase().includes(q));
        }
        if (filters.type.length) result = result.filter(j => filters.type.includes(j.type));
        if (filters.specialization.length) result = result.filter(j => filters.specialization.includes(j.specialization));
        if (filters.experienceLevel.length) result = result.filter(j => filters.experienceLevel.includes(j.experienceLevel));
        if (filters.remoteOnly) result = result.filter(j => j.isRemote);
        return result;
    }, [search, filters]);

    const displayJob = selectedJob ?? jobs[0];

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            <div className="max-w-8xl mx-auto px-4 xl:px-8">

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-navy-400 mb-3">
                        <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-navy-200">Career</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary">Jobs</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl text-white">
                                Job <span className="text-gradient-gold">Board</span>
                            </h1>
                            <p className="text-navy-300 mt-2">Petroleum engineering opportunities across Algeria and the MENA region</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/explore/career/internships">
                                <Button variant="outline" size="sm" className="border-teal-500/40 text-teal-400 hover:bg-teal-500/10">Internships</Button>
                            </Link>
                            <Link href="/explore/career/mentorship">
                                <Button variant="outline" size="sm">Find a Mentor</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6 max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <Input
                        placeholder="Search by title, company, or specialization..."
                        className="pl-12 h-12 bg-navy-900 border-navy-500 rounded-xl focus:border-primary text-base"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className={`w-64 flex-shrink-0 hidden lg:block`}>
                        <div className="glass p-5 rounded-2xl border border-navy-600 sticky top-24">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-display text-lg text-white flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" /> Filters
                                </h2>
                                {totalFilters > 0 && (
                                    <button onClick={clearFilters} className="text-xs text-navy-400 hover:text-primary transition-colors">Clear ({totalFilters})</button>
                                )}
                            </div>

                            {/* Remote Only */}
                            <label className="flex items-center gap-3 cursor-pointer mb-6 group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${filters.remoteOnly ? 'bg-teal-500 border-teal-500' : 'bg-navy-900 border-navy-500'}`}>
                                    {filters.remoteOnly && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </div>
                                <span className={`text-sm ${filters.remoteOnly ? 'text-teal-400' : 'text-navy-300 group-hover:text-white'} transition-colors`}>Remote OK</span>
                            </label>

                            <FilterSection title="Job Type" options={JOB_TYPES} active={filters.type} onToggle={v => toggle("type", v)} />
                            <FilterSection title="Specialization" options={SPECIALIZATIONS} active={filters.specialization} onToggle={v => toggle("specialization", v)} />
                            <FilterSection title="Experience" options={EXPERIENCE_LEVELS} active={filters.experienceLevel} onToggle={v => toggle("experienceLevel", v)} />
                        </div>
                    </aside>

                    {/* Main: List + Detail Panel */}
                    <div className="flex-1 min-w-0 flex gap-5">

                        {/* Job List */}
                        <div className="w-full lg:w-[42%] xl:w-[38%] flex-shrink-0 space-y-3">
                            <p className="text-sm text-navy-400 mb-4">{jobs.length} positions found</p>
                            <AnimatePresence mode="popLayout">
                                {jobs.length > 0 ? jobs.map(job => (
                                    <JobCard key={job.id} job={job} isSelected={displayJob?.id === job.id} onClick={() => setSelectedJob(job)} />
                                )) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center border border-dashed border-navy-600 rounded-2xl">
                                        <Building2 className="w-12 h-12 text-navy-600 mx-auto mb-4"/>
                                        <h3 className="text-white font-display text-xl mb-2">No jobs found</h3>
                                        <p className="text-navy-400 text-sm">Try adjusting your filters</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Job Detail Panel */}
                        {displayJob && (
                            <div className="hidden lg:block flex-1 min-w-0">
                                <div className="glass border border-navy-600 rounded-2xl p-8 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-600 flex items-center justify-center text-2xl font-display font-bold text-primary flex-shrink-0">
                                            {displayJob.company.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {displayJob.isHot && <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs"><Flame className="w-3 h-3 mr-1 inline"/>🔥 Hot Job</Badge>}
                                                {displayJob.isFeatured && <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">⭐ Featured</Badge>}
                                            </div>
                                            <h2 className="font-display text-2xl text-white">{displayJob.title}</h2>
                                            <p className="text-navy-300 mt-1 flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-navy-400"/>
                                                {displayJob.company}
                                                <span className="text-navy-600">·</span>
                                                <MapPin className="w-4 h-4 text-navy-400"/>
                                                {displayJob.location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Salary if available */}
                                    {displayJob.salary && (
                                        <div className="mb-5 bg-primary/5 border border-primary/20 rounded-xl p-3 text-sm">
                                            <span className="text-navy-300">Compensation: </span>
                                            <span className="text-primary font-semibold">{displayJob.salary}</span>
                                        </div>
                                    )}

                                    {/* Meta chips */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className={`px-3 py-1 rounded-full text-sm border font-medium ${JOB_TYPE_STYLES[displayJob.type].bg} ${JOB_TYPE_STYLES[displayJob.type].text} ${JOB_TYPE_STYLES[displayJob.type].border}`}>{displayJob.type}</span>
                                        <span className="px-3 py-1 rounded-full text-sm border font-medium bg-navy-800 text-navy-200 border-navy-600">{displayJob.experienceLevel}</span>
                                        <span className="px-3 py-1 rounded-full text-sm border font-medium bg-navy-800 text-navy-200 border-navy-600">{displayJob.specialization}</span>
                                        {displayJob.isRemote && (
                                            <span className="px-3 py-1 rounded-full text-sm border font-medium bg-teal-500/10 text-teal-400 border-teal-500/30 flex items-center gap-1">
                                                <Wifi className="w-3 h-3"/>Remote OK
                                            </span>
                                        )}
                                    </div>

                                    {/* Deadline bar */}
                                    <div className="mb-6">
                                        {(() => {
                                            const days = daysUntil(displayJob.deadline);
                                            const pct = Math.min(100, Math.max(0, (days / 30) * 100));
                                            return (
                                                <div>
                                                    <div className="flex justify-between text-xs text-navy-400 mb-1.5">
                                                        <span>Application Deadline</span>
                                                        <span className={days <= 7 ? "text-red-400 font-medium" : ""}>{days === 0 ? "Closes today!" : `${days} days remaining`}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${pct}%` }}
                                                            transition={{ duration: 0.6 }}
                                                            className={`h-full rounded-full ${days <= 7 ? "bg-red-500" : "bg-primary"}`}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div className="prose prose-invert max-w-none">
                                        <h4 className="font-display text-lg text-white mb-3">About this Role</h4>
                                        <p className="text-navy-200 leading-relaxed text-sm mb-6">{displayJob.description}</p>

                                        <h4 className="font-display text-lg text-white mb-3">Requirements</h4>
                                        <ul className="space-y-2 mb-6">
                                            {displayJob.requirements.map((r, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-navy-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"/>
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>

                                        <h4 className="font-display text-lg text-white mb-3">Responsibilities</h4>
                                        <ul className="space-y-2 mb-6">
                                            {displayJob.responsibilities.map((r, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-navy-200">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0"/>
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link href={`/explore/career/jobs/${displayJob.id}`}>
                                        <Button className="w-full mt-2 shadow-gold-md" size="lg">Apply for this Position</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function FilterSection({ title, options, active, onToggle }: { title: string; options: string[]; active: string[]; onToggle: (v: string) => void }) {
    return (
        <div className="mb-6">
            <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">{title}</h3>
            <div className="space-y-2.5">
                {options.map(opt => (
                    <label key={opt} onClick={() => onToggle(opt)} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${active.includes(opt) ? 'bg-primary border-primary' : 'bg-navy-900 border-navy-600 group-hover:border-primary/50'}`}>
                            {active.includes(opt) && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <span className={`text-sm ${active.includes(opt) ? 'text-white' : 'text-navy-400 group-hover:text-white'} transition-colors`}>{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
