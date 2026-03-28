"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Search, Lock, Star, MapPin, Clock, ChevronRight, Filter, SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Engineer {
    id: string; initials: string; specialization: string;
    experience: number; location: string; availability: string;
    skills: string[]; language: string; rating: number; locked: boolean;
}

const MOCK_ENGINEERS: Engineer[] = [
    { id: "e01", initials: "A.H", specialization: "Drilling", experience: 8, location: "Alger", availability: "Open to offers", skills: ["Directional Drilling", "BHA Design", "IWCF"], language: "AR/EN", rating: 4.9, locked: false },
    { id: "e02", initials: "S.B", specialization: "Reservoir", experience: 5, location: "Oran", availability: "Actively looking", skills: ["Eclipse", "History Matching", "Petrel"], language: "FR/EN", rating: 4.7, locked: false },
    { id: "e03", initials: "K.M", specialization: "Production", experience: 12, location: "Hassi Messaoud", availability: "Open to offers", skills: ["NODAL Analysis", "ESP", "PIPESIM"], language: "AR", rating: 5.0, locked: true },
    { id: "e04", initials: "Y.Z", specialization: "HSE", experience: 6, location: "Skikda", availability: "Not looking", skills: ["PSM", "HAZOP", "NEBOSH IGC"], language: "FR/AR", rating: 4.6, locked: true },
    { id: "e05", initials: "N.A", specialization: "LNG", experience: 9, location: "Bethioua", availability: "Open to offers", skills: ["HYSYS", "Cryogenic", "Process Safety"], language: "FR/EN", rating: 4.8, locked: true },
    { id: "e06", initials: "R.K", specialization: "Economics", experience: 4, location: "Alger", availability: "Actively looking", skills: ["DCF Modeling", "@Risk", "PSA"], language: "AR/FR", rating: 4.5, locked: true },
    { id: "e07", initials: "F.B", specialization: "Drilling", experience: 3, location: "Ouargla", availability: "Actively looking", skills: ["Drilling Fluids", "Well Control", "Petrel"], language: "AR/EN", rating: 4.4, locked: true },
    { id: "e08", initials: "M.L", specialization: "Reservoir", experience: 15, location: "Alger", availability: "Open to offers", skills: ["tNavigator", "CMG", "Well Testing"], language: "EN/FR", rating: 4.9, locked: true },
    { id: "e09", initials: "H.D", specialization: "Production", experience: 7, location: "Constantine", availability: "Not looking", skills: ["Gas Lift", "Sucker Rod", "Production Chemistry"], language: "AR", rating: 4.7, locked: true },
];

const AVAILABILITY_STYLES: Record<string, string> = {
    "Actively looking": "bg-green-500/15 text-green-400 border-green-500/25",
    "Open to offers": "bg-primary/10 text-primary border-primary/25",
    "Not looking": "bg-navy-800 text-navy-500 border-navy-700",
};

const SPECIALIZATIONS = ["All", "Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];
const EXPERIENCE_OPTIONS = ["Any", "0–3 years", "3–7 years", "7–12 years", "12+ years"];

function EngineerCard({ eng, onUnlock }: { eng: Engineer; onUnlock: () => void }) {
    return (
        <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="relative bg-navy-900 border border-navy-600 rounded-2xl p-5 group hover:border-primary/40 transition-all duration-300">
            {eng.locked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-950/70 backdrop-blur-sm rounded-2xl z-10">
                    <div className="text-center px-6">
                        <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                        <p className="text-sm font-semibold text-white mb-1">Profile Locked</p>
                        <p className="text-xs text-navy-400 mb-4">Unlock requires Professional plan</p>
                        <Button size="sm" onClick={onUnlock} className="shadow-gold-sm text-xs">Upgrade to Unlock</Button>
                    </div>
                </div>
            )}
            <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-display font-bold flex-shrink-0 ${eng.locked ? 'bg-navy-800 text-navy-600 blur-[2px]' : 'bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 text-primary'}`}>
                    {eng.locked ? "??" : eng.initials}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <p className={`font-display text-lg ${eng.locked ? 'blur-[3px] text-navy-400' : 'text-white'}`}>{eng.locked ? "Eng. ████████" : `Eng. ${eng.initials}`}</p>
                            <p className="text-primary text-sm font-medium">{eng.specialization} Engineer</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-primary"><Star className="w-3.5 h-3.5 fill-primary" /> {eng.rating}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-navy-400 mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{eng.experience}yr exp</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{eng.location}</span>
                        <span>🌐 {eng.language}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {eng.skills.map(sk => (
                            <span key={sk} className="text-[11px] px-2 py-0.5 rounded bg-navy-800 border border-navy-700 text-navy-200">{sk}</span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${AVAILABILITY_STYLES[eng.availability]}`}>{eng.availability}</span>
                        {!eng.locked && <Button size="sm" variant="outline" className="text-xs border-primary/40 text-primary hover:bg-primary/10">View Profile →</Button>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function TalentDatabasePage() {
    const [search, setSearch] = useState("");
    const [spec, setSpec] = useState("All");
    const [experience, setExperience] = useState("Any");
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const engineers = MOCK_ENGINEERS.filter(e => {
        if (spec !== "All" && e.specialization !== spec) return false;
        if (search) {
            const q = search.toLowerCase();
            if (!e.specialization.toLowerCase().includes(q) && !e.skills.some(s => s.toLowerCase().includes(q))) return false;
        }
        return true;
    });

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            {showUpgradeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 backdrop-blur-sm px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-navy-900 border border-primary/40 rounded-2xl p-8 max-w-md w-full text-center shadow-gold-md">
                        <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="font-display text-2xl text-white mb-2">Upgrade to Unlock Profiles</h3>
                        <p className="text-navy-300 mb-6">The Professional plan gives you 100 profile unlocks/month and full contact details.</p>
                        <div className="flex flex-col gap-3">
                            <Link href="/companies#contact"><Button className="w-full shadow-gold-sm" onClick={() => setShowUpgradeModal(false)}>View Plans & Pricing</Button></Link>
                            <Button variant="secondary" className="w-full" onClick={() => setShowUpgradeModal(false)}>Maybe Later</Button>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4 xl:px-8">
                <div className="flex items-center gap-2 text-sm text-navy-400 mb-8">
                    <Link href="/companies" className="hover:text-primary transition-colors">Companies</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">Talent Database</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl text-white">Browse <span className="text-gradient-gold">Verified</span> Engineers</h1>
                        <p className="text-navy-300 mt-2">12,400+ petroleum professionals — searchable, filterable, hirable</p>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 text-sm">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium">2 free unlocks remaining</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                        <Input placeholder="Search by skill, certification, or specialization..." className="pl-12 h-12 bg-navy-900 border-navy-500 rounded-xl focus:border-primary" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {SPECIALIZATIONS.map(s => (
                            <button key={s} onClick={() => setSpec(s)} className={`px-3 py-2 rounded-xl text-sm border transition-all ${spec === s ? 'bg-primary text-navy-950 border-primary' : 'bg-navy-900 border-navy-600 text-navy-400 hover:text-white'}`}>{s}</button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-6">
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <div className="glass border border-navy-600 rounded-2xl p-5 sticky top-24">
                            <h2 className="font-display text-lg text-white flex items-center gap-2 mb-5"><Filter className="w-4 h-4 text-primary"/>Filters</h2>
                            <div className="mb-5">
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-3">Experience</h3>
                                {EXPERIENCE_OPTIONS.map(opt => (
                                    <label key={opt} onClick={() => setExperience(opt)} className="flex items-center gap-2.5 cursor-pointer group mb-2.5">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${experience === opt ? 'bg-primary border-primary' : 'bg-navy-900 border-navy-600 group-hover:border-primary/50'}`}>
                                            {experience === opt && <div className="w-2 h-2 rounded-full bg-navy-950" />}
                                        </div>
                                        <span className={`text-sm ${experience === opt ? 'text-white' : 'text-navy-400 group-hover:text-white'}`}>{opt}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="border-t border-navy-700 pt-4">
                                <div className="flex items-center gap-2 text-xs text-primary mb-1"><Lock className="w-3 h-3"/>Premium Filters</div>
                                <p className="text-xs text-navy-500">Language, certification filters available on Professional plan.</p>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-navy-400 mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4"/>
                            {engineers.length} engineers · <span className="text-primary">2 unlocked</span> · {engineers.filter(e => e.locked).length} locked
                        </p>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {engineers.map(eng => (
                                <EngineerCard key={eng.id} eng={eng} onUnlock={() => setShowUpgradeModal(true)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
