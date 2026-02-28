"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, FileBadge,
    Trophy, ArrowRight, Library, Sparkles, TrendingUp, Download
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_LIBRARY, ResourceType } from "@/data/library";
import { ResourceCard } from "@/components/shared/ResourceCard";

const TABS: { label: string; value: ResourceType | "All" }[] = [
    { label: "All Resources", value: "All" },
    { label: "Books", value: "Book" },
    { label: "Research Papers", value: "Research Paper" },
    { label: "Summaries", value: "Summary" },
    { label: "Graduation Projects", value: "Graduation Project" },
];

export default function LibraryHome() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<ResourceType | "All">("All");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/library/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push(`/library/search`);
        }
    };

    // Data Selectors
    const featuredResources = MOCK_LIBRARY.filter(r => r.isFeatured).slice(0, 4);
    const recentAdditions = [...MOCK_LIBRARY].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()).slice(0, 6);
    const popularThisWeek = [...MOCK_LIBRARY].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 5);

    const displayResources = activeTab === "All"
        ? recentAdditions
        : MOCK_LIBRARY.filter(r => r.type === activeTab).slice(0, 6);

    return (
        <main className="min-h-screen bg-navy-950 pb-20">

            {/* Hero Search Section */}
            <section className="relative pt-32 pb-24 border-b border-navy-500/30 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />

                <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-6 bg-navy-900/50 backdrop-blur border-primary/30 text-primary">
                        <Library className="w-4 h-4 mr-2 inline" />
                        HELM Academy Digital Library
                    </Badge>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl">
                        Your Petroleum <br />
                        <span className="text-gradient-gold">Knowledge Hub</span>
                    </h1>

                    <p className="text-navy-200 text-lg md:text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed">
                        Access thousands of premium books, industry research papers, operational summaries, and top graduation projects.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
                        <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-navy-900/80 backdrop-blur-xl border border-navy-500 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                            <div className="pl-4 pr-2">
                                <Search className="w-6 h-6 text-navy-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search by title, author, keyword, or ISBN..."
                                className="flex-1 bg-transparent border-none text-white text-lg h-14 placeholder:text-navy-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="lg" className="h-14 px-8 rounded-xl font-bold shadow-gold-md">
                                Search
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-navy-300">
                            <span className="mr-2">Popular:</span>
                            <button type="button" onClick={() => setSearchQuery("Well Control")} className="hover:text-primary transition-colors hover:underline underline-offset-4">Well Control</button>,
                            <button type="button" onClick={() => setSearchQuery("Eclipse")} className="hover:text-primary transition-colors hover:underline underline-offset-4">Eclipse</button>,
                            <button type="button" onClick={() => setSearchQuery("Drilling Fluids")} className="hover:text-primary transition-colors hover:underline underline-offset-4">Drilling Fluids</button>,
                            <button type="button" onClick={() => setSearchQuery("NODAL")} className="hover:text-primary transition-colors hover:underline underline-offset-4">NODAL</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Featured Resources (Horizontal Scroll or Grid) */}
            <section className="section-padding relative border-b border-navy-600/30 bg-navy-950/50">
                <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-teal-500/5 to-transparent pointer-events-none" />
                <div className="section-container relative z-10">

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-display text-white flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Featured Selections
                            </h2>
                            <p className="text-navy-300 mt-2">Editor&apos;s picks and highly recommended readings.</p>
                        </div>
                        <Button variant="ghost" className="hidden sm:flex" asChild>
                            <Link href="/library/search?featured=true">View all <ArrowRight className="w-4 h-4 ml-2" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredResources.map((resource, idx) => (
                            <ResourceCard key={resource.id} resource={resource} index={idx} />
                        ))}
                    </div>

                </div>
            </section>

            <section className="section-padding">
                <div className="section-container">
                    <div className="flex flex-col xl:flex-row gap-12">

                        {/* Left: Browse by Category (70%) */}
                        <div className="flex-[2.5] w-full">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-display text-white">Browse Library</h2>
                            </div>

                            {/* Custom Animated Tabs */}
                            <div className="flex flex-wrap items-center gap-2 border-b border-navy-600/50 mb-8 pb-4">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setActiveTab(tab.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative outline-none ${activeTab === tab.value
                                            ? 'text-navy-950 bg-primary shadow-gold-md'
                                            : 'text-navy-300 hover:text-white hover:bg-navy-800'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Grid based on Tab */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                                <AnimatePresence mode="popLayout">
                                    {displayResources.map((resource, idx) => (
                                        <ResourceCard key={resource.id} resource={resource} index={idx} />
                                    ))}
                                    {displayResources.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-navy-600 rounded-2xl bg-navy-900/30"
                                        >
                                            <FileBadge className="w-12 h-12 text-navy-500 mb-4" />
                                            <h3 className="text-white font-display text-xl mb-2">No items found</h3>
                                            <p className="text-navy-300">We couldn&apos;t find any resources in this specific category.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {displayResources.length > 0 && (
                                <div className="mt-10 text-center">
                                    <Button variant="outline" size="lg" asChild>
                                        <Link href={`/library/search${activeTab !== "All" ? `?type=${activeTab}` : ''}`}>
                                            Load More {activeTab === "All" ? "Resources" : activeTab + "s"}
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Right: Popular This Week (30%) */}
                        <aside className="flex-1 w-full xl:max-w-sm">
                            <div className="bg-navy-900/50 border border-navy-600 rounded-2xl p-6 sticky top-28">
                                <h3 className="text-xl font-display text-white mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Popular This Week
                                </h3>

                                <div className="space-y-4">
                                    {popularThisWeek.map((resource, idx) => (
                                        <Link key={resource.id} href={`/library/search`} className="group flex gap-4 items-start p-3 -mx-3 rounded-xl hover:bg-navy-800 transition-colors">
                                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-display font-bold text-lg rounded-full">
                                                {idx === 0 ? (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20">
                                                        <Trophy className="w-4 h-4 text-navy-950" />
                                                    </div>
                                                ) : idx === 1 ? (
                                                    <span className="text-gray-300">2</span>
                                                ) : idx === 2 ? (
                                                    <span className="text-amber-700">3</span>
                                                ) : (
                                                    <span className="text-navy-500">{idx + 1}</span>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white text-sm font-medium leading-tight mb-1 group-hover:text-primary transition-colors truncate">
                                                    {resource.title}
                                                </h4>
                                                <p className="text-xs text-navy-300 truncate">
                                                    {resource.author}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-[10px] uppercase tracking-wider text-navy-400 bg-navy-950 px-1.5 py-0.5 rounded border border-navy-700">
                                                        {resource.type}
                                                    </span>
                                                    <span className="text-xs font-medium text-navy-300 flex items-center gap-1">
                                                        <Download className="w-3 h-3 text-primary" /> {(resource.downloadCount / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Button variant="ghost" className="w-full mt-6 text-navy-300 hover:text-white border border-dashed border-navy-600">
                                    View Full Rankings
                                </Button>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

        </main>
    );
}
