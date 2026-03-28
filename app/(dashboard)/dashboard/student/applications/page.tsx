"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "all" | "Pending" | "Reviewed" | "Accepted" | "Rejected";

const STATUS_STYLES: Record<string, string> = {
    Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Reviewed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Accepted: "bg-green-500/15 text-green-400 border-green-500/30",
    Rejected: "bg-red-500/15 text-red-400 border-red-500/30",
};

const APPLICATIONS = [
    { id: 1, title: "Senior Drilling Engineer", company: "Sonatrach", location: "Hassi Messaoud", type: "Full-time", status: "Pending", date: "Mar 8, 2026" },
    { id: 2, title: "Reservoir Engineering Intern", company: "TotalEnergies", location: "Alger", type: "Internship", status: "Reviewed", date: "Mar 5, 2026" },
    { id: 3, title: "Production Technologist", company: "SLB", location: "Ouargla", type: "Contract", status: "Accepted", date: "Feb 28, 2026" },
    { id: 4, title: "HSE Coordinator", company: "Halliburton", location: "Oran", type: "Full-time", status: "Rejected", date: "Feb 20, 2026" },
    { id: 5, title: "Drilling Fluids Engineer", company: "BP Algeria", location: "In Amenas", type: "Contract", status: "Pending", date: "Feb 15, 2026" },
    { id: 6, title: "LNG Process Engineer", company: "Repsol", location: "Bethioua", type: "Full-time", status: "Reviewed", date: "Feb 10, 2026" },
];

export default function ApplicationsPage() {
    const [filter, setFilter] = useState<Status>("all");
    const filtered = APPLICATIONS.filter(a => filter === "all" || a.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {(["all", "Pending", "Reviewed", "Accepted", "Rejected"] as Status[]).map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${filter === s ? "bg-primary text-navy-950 border-primary" : "border-navy-600 text-navy-400 hover:text-white"}`}>
                        {s === "all" ? "All" : s} {s !== "all" && `(${APPLICATIONS.filter(a => a.status === s).length})`}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16"><div className="text-4xl mb-3">📋</div><p className="text-navy-400">No applications match this filter.</p></div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((app, idx) => (
                        <motion.div key={app.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                            className="bg-navy-900 border border-navy-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center flex-shrink-0 font-bold text-primary text-sm">
                                {app.company.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-white">{app.title}</p>
                                <div className="flex flex-wrap gap-2 text-xs text-navy-400 mt-1">
                                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{app.company}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.location}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Applied {app.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLES[app.status]}`}>{app.status}</span>
                                <Button size="sm" variant="outline" className="text-xs gap-1"><ExternalLink className="w-3 h-3" />View</Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
