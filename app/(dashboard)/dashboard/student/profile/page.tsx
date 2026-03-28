"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Building2, MapPin, BookOpen, Award, Save, ExternalLink, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
    const [editing, setEditing] = useState(false);
    const [profile] = useState({
        name: "Ahmed Hadjali",
        email: "ahmed.hadjali@example.com",
        university: "USTHB — Algiers",
        location: "Algiers, Algeria",
        specialization: "Drilling Engineering",
        experience: "3 years",
        bio: "Petroleum engineering graduate passionate about directional drilling and well control technologies. Currently pursuing IWCF certification.",
        skills: ["Directional Drilling", "Well Control", "Petrel", "HYSYS", "Eclipse", "Drilling Fluids"],
    });

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Profile Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="bg-navy-900 border border-navy-700 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent" />
                <div className="relative flex flex-col sm:flex-row items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center font-display text-2xl text-primary font-bold flex-shrink-0">
                        AH
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="font-display text-2xl text-white">{profile.name}</h2>
                                <p className="text-sm text-primary font-medium">{profile.specialization}</p>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => setEditing(!editing)}>
                                <Edit3 className="w-3 h-3" />{editing ? "Cancel" : "Edit"}
                            </Button>
                        </div>
                        <p className="text-sm text-navy-300 mt-2 leading-relaxed">{profile.bio}</p>
                    </div>
                </div>
            </motion.div>

            {/* Info Fields */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 space-y-4">
                <h3 className="font-display text-lg text-white mb-4">Personal Information</h3>
                {[
                    { icon: Mail, label: "Email", value: profile.email },
                    { icon: Building2, label: "University / Company", value: profile.university },
                    { icon: MapPin, label: "Location", value: profile.location },
                    { icon: BookOpen, label: "Specialization", value: profile.specialization },
                    { icon: Award, label: "Experience", value: profile.experience },
                ].map(field => {
                    const Icon = field.icon;
                    return (
                        <div key={field.label} className="flex items-center gap-4 py-3 border-b border-navy-800 last:border-0">
                            <Icon className="w-4 h-4 text-navy-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-navy-500">{field.label}</p>
                                {editing ? (
                                    <input className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-sm text-white mt-1 focus:border-primary focus:outline-none" defaultValue={field.value} />
                                ) : (
                                    <p className="text-sm text-white">{field.value}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
                {editing && (
                    <Button className="w-full mt-4 shadow-gold-sm font-bold gap-1" onClick={() => setEditing(false)}>
                        <Save className="w-4 h-4" /> Save Changes
                    </Button>
                )}
            </div>

            {/* Skills */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
                <h3 className="font-display text-lg text-white mb-4">Skills & Certifications</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                        <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 font-medium">{skill}</span>
                    ))}
                </div>
            </div>

            {/* CV Builder CTA */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="font-display text-lg text-white mb-1">Need a professional CV?</h3>
                    <p className="text-sm text-navy-300">Use HELM&apos;s petroleum-focused CV Builder</p>
                </div>
                <a href="/explore/career/cv-builder">
                    <Button size="md" className="gap-1"><ExternalLink className="w-4 h-4" />Build CV</Button>
                </a>
            </div>
        </div>
    );
}
