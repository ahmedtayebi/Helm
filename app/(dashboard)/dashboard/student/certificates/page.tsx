"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CERTIFICATES = [
    { id: 1, title: "IWCF Well Control — Level 1", issueDate: "Jan 15, 2026", course: "Well Control Fundamentals", credentialId: "HELM-WC-2026-0412", icon: "⛑️" },
    { id: 2, title: "Production Optimization", issueDate: "Dec 22, 2025", course: "Production Optimization", credentialId: "HELM-PO-2025-0891", icon: "🏭" },
    { id: 3, title: "HSE for Oil & Gas", issueDate: "Nov 8, 2025", course: "HSE for Oil & Gas Operations", credentialId: "HELM-HSE-2025-0633", icon: "🦺" },
    { id: 4, title: "Petroleum Economics", issueDate: "Oct 1, 2025", course: "Petroleum Economics 101", credentialId: "HELM-PE-2025-0277", icon: "📊" },
    { id: 5, title: "Drilling Fluids Engineering", issueDate: "Sep 14, 2025", course: "Drilling Fluids Masterclass", credentialId: "HELM-DF-2025-0188", icon: "🧪" },
    { id: 6, title: "HYSYS Process Simulation", issueDate: "Aug 2, 2025", course: "HYSYS for LNG Engineers", credentialId: "HELM-HY-2025-0101", icon: "🔵" },
    { id: 7, title: "Well Testing Analysis", issueDate: "Jul 10, 2025", course: "Well Testing Fundamentals", credentialId: "HELM-WT-2025-0055", icon: "📈" },
    { id: 8, title: "Directional Drilling Basics", issueDate: "Jun 5, 2025", course: "Intro to Directional Drilling", credentialId: "HELM-DD-2025-0012", icon: "⛏️" },
];

export default function CertificatesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-navy-400">{CERTIFICATES.length} certificates earned</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {CERTIFICATES.map((cert, idx) => (
                    <motion.div key={cert.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                        className="relative bg-navy-900 border border-navy-700 rounded-2xl p-5 hover:border-primary/30 transition-colors group overflow-hidden">
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-xl flex-shrink-0">{cert.icon}</div>
                            <div className="min-w-0">
                                <p className="font-display text-base text-white truncate">{cert.title}</p>
                                <p className="text-xs text-navy-400">{cert.course}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-navy-500 mb-4">
                            <span>Issued {cert.issueDate}</span>
                            <span className="font-mono text-navy-600">{cert.credentialId}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs gap-1"><Download className="w-3 h-3" />Download</Button>
                            <Button size="sm" variant="outline" className="flex-1 text-xs gap-1"><ExternalLink className="w-3 h-3" />LinkedIn</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
