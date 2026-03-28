"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAVED = [
    { id: 1, title: "Petroleum Production Engineering Handbook", author: "Boyun Guo et al.", type: "Book", year: 2023, thumb: "📘" },
    { id: 2, title: "Applied Drilling Engineering — SPE Textbook", author: "Adam T. Bourgoyne Jr.", type: "Book", year: 2021, thumb: "📕" },
    { id: 3, title: "Reservoir Simulation: Practices and Principles", author: "M.R. Islam", type: "Book", year: 2022, thumb: "📗" },
    { id: 4, title: "Optimising ESP Run-Life in Algerian Fields", author: "K. Bouzid et al.", type: "Paper", year: 2024, thumb: "📄" },
    { id: 5, title: "HYSYS Quick-Reference for Gas Processing", author: "HELM Academy", type: "Summary", year: 2025, thumb: "📋" },
    { id: 6, title: "Drilling Fluids Formulations Atlas", author: "SPE Algeria Chapter", type: "Book", year: 2020, thumb: "📘" },
];

export default function StudentLibraryPage() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(SAVED);
    const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
                <input placeholder="Search saved items..." className="pl-10 h-10 w-full bg-navy-800 border border-navy-600 rounded-xl text-sm text-white placeholder:text-navy-500 focus:border-primary focus:outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {filtered.length === 0 ? (
                <div className="text-center py-16"><div className="text-4xl mb-3">📚</div><p className="text-navy-400">No saved items found.</p></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((item, idx) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                            className="bg-navy-900 border border-navy-700 rounded-xl p-4 hover:border-primary/30 transition-colors group">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-lg flex-shrink-0">{item.thumb}</div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                                    <p className="text-xs text-navy-400">{item.author} · {item.year}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-navy-800 text-navy-400 border border-navy-700">{item.type}</span>
                                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="outline" className="text-xs px-2"><ExternalLink className="w-3 h-3" /></Button>
                                    <Button size="sm" variant="outline" className="text-xs px-2 text-red-400 border-red-500/30 hover:bg-red-500/10" onClick={() => setItems(p => p.filter(x => x.id !== item.id))}><Trash2 className="w-3 h-3" /></Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
