"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Clock, Users, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MOCK_MENTORS, Mentor } from "@/data/jobs";
import Link from "next/link";
import Image from "next/image";

const AVAILABILITY_STYLES = {
    "Available": { badge: "bg-green-500/15 text-green-400 border-green-500/30", dot: "bg-green-400" },
    "Limited": { badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30", dot: "bg-yellow-400" },
    "Unavailable": { badge: "bg-navy-700 text-navy-400 border-navy-600", dot: "bg-navy-500" },
};

function MentorCard({ mentor, index }: { mentor: Mentor; index: number }) {
    const avStyle = AVAILABILITY_STYLES[mentor.availability];
    const isAvailable = mentor.availability !== "Unavailable";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="group bg-navy-900 border border-navy-600 rounded-2xl p-6 hover:border-primary/40 hover:shadow-gold-sm transition-all duration-300 flex flex-col"
        >
            {/* Avatar + Availability */}
            <div className="flex items-start justify-between mb-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-navy-600 group-hover:border-primary/50 transition-colors">
                        <Image src={mentor.avatar} alt={mentor.name} width={64} height={64} className="object-cover" />
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-navy-900 ${avStyle.dot}`} />
                </div>

                <Badge className={`${avStyle.badge} text-xs pointer-events-none`}>
                    {mentor.availability}
                </Badge>
            </div>

            {/* Info */}
            <h3 className="font-display text-lg text-white mb-0.5 group-hover:text-primary transition-colors">{mentor.name}</h3>
            <p className="text-sm text-navy-300 mb-1">{mentor.currentRole}</p>
            <p className="text-xs text-primary font-medium mb-4">{mentor.company}</p>

            <p className="text-sm text-navy-300 leading-relaxed line-clamp-2 mb-4 flex-1">{mentor.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {mentor.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-navy-800 border border-navy-700 text-navy-200">{skill}</span>
                ))}
                {mentor.skills.length > 3 && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-navy-800 border border-navy-700 text-navy-400">+{mentor.skills.length - 3}</span>
                )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs text-navy-400 mb-5 pt-4 border-t border-navy-700/50">
                <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                    <strong className="text-white">{mentor.rating}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {mentor.sessions} sessions
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {mentor.yearsExperience}yr exp
                </span>
            </div>

            <Button
                className={`w-full font-semibold ${isAvailable ? 'shadow-gold-sm' : ''}`}
                variant={isAvailable ? "primary" : "secondary"}
                disabled={!isAvailable}
                size="sm"
            >
                {mentor.availability === "Available" ? "📅 Book a Session" : mentor.availability === "Limited" ? "Join Waitlist" : "Currently Unavailable"}
            </Button>
        </motion.div>
    );
}

export default function MentorshipPage() {
    const [search, setSearch] = useState("");
    const [activeSpec, setActiveSpec] = useState<string>("All");

    const specializations = ["All", "Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];

    const mentors = useMemo(() => {
        let result = [...MOCK_MENTORS];
        if (activeSpec !== "All") result = result.filter(m => m.specialization === activeSpec);
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(m => m.name.toLowerCase().includes(q) || m.company.toLowerCase().includes(q) || m.specialization.toLowerCase().includes(q));
        }
        return result;
    }, [activeSpec, search]);

    return (
        <main className="min-h-screen bg-navy-950 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 xl:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-navy-400 mb-8">
                    <Link href="/explore" className="hover:text-primary">Explore</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/explore/career/jobs" className="hover:text-primary">Career</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">Mentorship</span>
                </div>

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
                        Learn from the <span className="text-gradient-gold">Best</span>
                    </h1>
                    <p className="text-navy-200 text-lg leading-relaxed">
                        1-on-1 mentoring sessions with senior engineers from Sonatrach, SLB, TotalEnergies, and more. Get career advice, technical guidance, and interview prep.
                    </p>
                </div>

                {/* Search */}
                <div className="relative max-w-xl mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                    <Input placeholder="Search mentors by name, company, or specialization..." className="pl-12 h-12 bg-navy-900 border-navy-500 rounded-xl focus:border-primary" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {/* Specialization Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {specializations.map(spec => (
                        <button
                            key={spec}
                            onClick={() => setActiveSpec(spec)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                activeSpec === spec
                                    ? "bg-primary text-navy-950 border-primary shadow-gold-sm"
                                    : "bg-navy-900 text-navy-300 border-navy-600 hover:border-navy-400 hover:text-white"
                            }`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>

                {/* Mentor Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentors.map((mentor, idx) => (
                        <MentorCard key={mentor.id} mentor={mentor} index={idx} />
                    ))}
                </div>

                {mentors.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-navy-600 rounded-2xl">
                        <p className="text-navy-400 text-lg">No mentors found for this specialization</p>
                        <button onClick={() => setActiveSpec("All")} className="mt-4 text-primary hover:underline text-sm">Show all mentors</button>
                    </div>
                )}

                {/* CTA Banner */}
                <div className="mt-16 bg-gradient-to-r from-primary/10 via-navy-900 to-teal-500/5 border border-primary/20 rounded-3xl p-8 text-center">
                    <h2 className="font-display text-3xl text-white mb-3">Want to become a HELM Mentor?</h2>
                    <p className="text-navy-300 mb-6 max-w-lg mx-auto">Share your expertise with the next generation of petroleum engineers. Set your own schedule and make a lasting impact.</p>
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">Apply to Become a Mentor</Button>
                </div>
            </div>
        </main>
    );
}
