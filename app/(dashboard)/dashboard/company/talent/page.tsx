"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Mail, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPECIALIZATIONS = ["All", "Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];

const ENGINEERS = [
    { id: 1, name: "Yacine Benouis", spec: "Drilling", experience: "8 years", location: "Hassi Messaoud", rating: 4.9, skills: ["Directional", "Well Control", "MWD"], locked: false, avatar: "YB" },
    { id: 2, name: "Meriem Charef", spec: "Reservoir", experience: "3 years", location: "Algiers", rating: 4.7, skills: ["Eclipse", "Petrel", "PVT"], locked: false, avatar: "MC" },
    { id: 3, name: "Sofiane Kaci", spec: "HSE", experience: "5 years", location: "Oran", rating: 4.8, skills: ["HAZOP", "PSM", "Risk Mgmt"], locked: true, avatar: "SK" },
    { id: 4, name: "Amina Djalil", spec: "Drilling", experience: "10 years", location: "Ouargla", rating: 4.9, skills: ["Casing", "Cementing", "Rig Ops"], locked: true, avatar: "AD" },
    { id: 5, name: "Nadia Slimani", spec: "Production", experience: "6 years", location: "Bethioua", rating: 4.6, skills: ["ESP", "Nodal Analysis", "Artificial Lift"], locked: true, avatar: "NS" },
    { id: 6, name: "Rachid Boudissa", spec: "LNG", experience: "7 years", location: "Arzew", rating: 4.8, skills: ["HYSYS", "LNG Process", "Heat Exchange"], locked: true, avatar: "RB" },
];

export default function CompanyTalentPage() {
    const [spec, setSpec] = useState("All");
    const [search, setSearch] = useState("");
    const filtered = ENGINEERS.filter(e => (spec === "All" || e.spec === spec) && (!search || e.name.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                    {SPECIALIZATIONS.map(s => (
                        <button key={s} onClick={() => setSpec(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${spec === s ? "bg-primary text-navy-950 border-primary" : "border-slate-300 dark:border-navy-600 text-slate-500 dark:text-navy-400 hover:text-[#0D1B2A] dark:text-white"}`}>
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-navy-500" />
                    <input placeholder="Search engineers..." className="pl-10 h-9 bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-600 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:text-navy-500 focus:border-primary focus:outline-none w-56" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((eng, idx) => (
                    <motion.div key={eng.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                        className={`relative bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl p-5 hover:border-primary/20 transition-colors ${eng.locked ? "overflow-hidden" : ""}`}>
                        {eng.locked && <div className="absolute inset-0 backdrop-blur-[2px] bg-navy-900/30 z-10 flex items-center justify-center">
                            <div className="text-center">
                                <Lock className="w-6 h-6 text-slate-400 dark:text-navy-500 mx-auto mb-2" />
                                <p className="text-xs text-slate-500 dark:text-navy-400">Upgrade to view</p>
                            </div>
                        </div>}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">{eng.avatar}</div>
                            <div>
                                <p className="font-semibold text-sm text-[#0D1B2A] dark:text-white">{eng.name}</p>
                                <p className="text-xs text-slate-500 dark:text-navy-400">{eng.spec} · {eng.experience}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-navy-400 mb-3">
                            <MapPin className="w-3 h-3" />{eng.location}
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-2" />{eng.rating}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {eng.skills.map(s => (
                                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-navy-300 border border-slate-200 dark:border-navy-700">{s}</span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs gap-1"><Eye className="w-3 h-3" />Profile</Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs gap-1"><Mail className="w-3 h-3" />Contact</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
