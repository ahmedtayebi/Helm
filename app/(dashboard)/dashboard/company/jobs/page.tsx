"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit3, Eye, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Status = "all" | "Active" | "Expired" | "Draft";
const STATUS_STYLES: Record<string, string> = {
    Active: "bg-green-500/15 text-green-400 border-green-500/30",
    Expired: "bg-red-500/15 text-red-400 border-red-500/30",
    Draft: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

const JOBS = [
    { id: 1, title: "Senior Drilling Engineer", location: "Hassi Messaoud", applicants: 42, status: "Active", posted: "Mar 1, 2026", deadline: "Apr 15" },
    { id: 2, title: "Reservoir Engineering Intern", location: "Algiers", applicants: 68, status: "Active", posted: "Feb 15, 2026", deadline: "Mar 31" },
    { id: 3, title: "HSE Coordinator", location: "Oran", applicants: 23, status: "Active", posted: "Feb 28, 2026", deadline: "Apr 10" },
    { id: 4, title: "Production Technologist", location: "Ouargla", applicants: 15, status: "Active", posted: "Mar 5, 2026", deadline: "Apr 20" },
    { id: 5, title: "Mud Engineer", location: "Ghardaia", applicants: 34, status: "Expired", posted: "Dec 1, 2025", deadline: "Jan 15" },
    { id: 6, title: "Wireline Supervisor", location: "In Amenas", applicants: 0, status: "Draft", posted: "—", deadline: "—" },
];

export default function CompanyJobsPage() {
    const [tab, setTab] = useState<Status>("all");
    const [search, setSearch] = useState("");
    const filtered = JOBS.filter(j => (tab === "all" || j.status === tab) && (!search || j.title.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                    {(["all", "Active", "Expired", "Draft"] as Status[]).map(s => (
                        <button key={s} onClick={() => setTab(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${tab === s ? "bg-primary text-navy-950 border-primary" : "border-navy-600 text-navy-400 hover:text-white"}`}>
                            {s === "all" ? "All" : s} {s !== "all" && `(${JOBS.filter(j => j.status === s).length})`}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                        <input placeholder="Search..." className="pl-10 h-9 bg-navy-800 border border-navy-600 rounded-xl text-sm text-white placeholder:text-navy-500 focus:border-primary focus:outline-none w-48" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <Link href="/companies/post-job"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3.5 h-3.5" />Post Job</Button></Link>
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((job, idx) => (
                    <motion.div key={job.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                        className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors">
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-white truncate">{job.title}</p>
                            <div className="flex flex-wrap gap-3 text-xs text-navy-400 mt-1">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants} applicants</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Deadline: {job.deadline}</span>
                            </div>
                        </div>
                        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[job.status]}`}>{job.status}</span>
                        <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="text-xs px-2"><Eye className="w-3.5 h-3.5" /></Button>
                            <Button size="sm" variant="outline" className="text-xs px-2"><Edit3 className="w-3.5 h-3.5" /></Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
