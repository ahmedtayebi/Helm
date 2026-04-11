"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileBadge, Trophy, TrendingUp, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/shared/ResourceCard";
import type { LibraryResource, ResourceType } from "@/data/library";

const TABS: { label: string; value: ResourceType | "All" }[] = [
    { label: "All Resources", value: "All" },
    { label: "Books", value: "Book" },
    { label: "Research Papers", value: "Research Paper" },
    { label: "Summaries", value: "Summary" },
    { label: "Graduation Projects", value: "Graduation Project" },
];

interface Props {
    allResources: LibraryResource[];
}

export function LibraryBrowse({ allResources }: Props) {
    const [activeTab, setActiveTab] = useState<ResourceType | "All">("All");

    const recentAdditions = [...allResources]
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
        .slice(0, 6);

    const popularThisWeek = [...allResources]
        .sort((a, b) => b.downloadCount - a.downloadCount)
        .slice(0, 5);

    const displayResources =
        activeTab === "All"
            ? recentAdditions
            : allResources.filter((r) => r.type === activeTab).slice(0, 6);

    return (
        <section className="section-padding">
            <div className="section-container">
                <div className="flex flex-col xl:flex-row gap-12">

                    {/* Left: Browse by Type (70%) */}
                    <div className="flex-[2.5] w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-display text-[#0D1B2A] dark:text-white">Browse Library</h2>
                            <Button variant="ghost" className="hidden sm:flex" asChild>
                                <Link href="/library/search">
                                    View all <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-navy-600/50 mb-8 pb-4">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative outline-none ${
                                        activeTab === tab.value
                                            ? "text-navy-950 bg-primary shadow-gold-md"
                                            : "text-slate-500 dark:text-navy-300 hover:text-[#0D1B2A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
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
                                        className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-slate-300 dark:border-navy-600 rounded-2xl bg-slate-50 dark:bg-navy-900/30"
                                    >
                                        <FileBadge className="w-12 h-12 text-slate-400 dark:text-navy-500 mb-4" />
                                        <h3 className="text-[#0D1B2A] dark:text-white font-display text-xl mb-2">No items found</h3>
                                        <p className="text-slate-500 dark:text-navy-300">
                                            We couldn&apos;t find any resources in this specific category.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {displayResources.length > 0 && (
                            <div className="mt-10 text-center">
                                <Button variant="outline" size="lg" asChild>
                                    <Link href={`/library/search${activeTab !== "All" ? `?type=${activeTab}` : ""}`}>
                                        Load More {activeTab === "All" ? "Resources" : activeTab + "s"}
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right: Popular This Week (30%) */}
                    <aside className="flex-1 w-full xl:max-w-sm">
                        <div className="bg-white/50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-600 rounded-2xl p-6 sticky top-28">
                            <h3 className="text-xl font-display text-[#0D1B2A] dark:text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Popular This Week
                            </h3>

                            <div className="space-y-4">
                                {popularThisWeek.map((resource, idx) => (
                                    <Link
                                        key={resource.id}
                                        href="/library/search"
                                        className="group flex gap-4 items-start p-3 -mx-3 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center font-display font-bold text-lg rounded-full">
                                            {idx === 0 ? (
                                                <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-primary/20">
                                                    <Trophy className="w-4 h-4 text-navy-950" />
                                                </div>
                                            ) : idx === 1 ? (
                                                <span className="text-slate-400 dark:text-gray-300">2</span>
                                            ) : idx === 2 ? (
                                                <span className="text-amber-700">3</span>
                                            ) : (
                                                <span className="text-slate-400 dark:text-navy-500">{idx + 1}</span>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[#0D1B2A] dark:text-white text-sm font-medium leading-tight mb-1 group-hover:text-primary transition-colors truncate">
                                                {resource.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-navy-300 truncate">
                                                {resource.author}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-navy-400 bg-slate-100 dark:bg-navy-950 px-1.5 py-0.5 rounded border border-slate-200 dark:border-navy-700">
                                                    {resource.type}
                                                </span>
                                                <span className="text-xs font-medium text-slate-500 dark:text-navy-300 flex items-center gap-1">
                                                    <Download className="w-3 h-3 text-primary" />
                                                    {(resource.downloadCount / 1000).toFixed(1)}k
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Button
                                variant="ghost"
                                className="w-full mt-6 text-slate-500 dark:text-navy-300 hover:text-[#0D1B2A] dark:hover:text-white border border-dashed border-slate-300 dark:border-navy-600"
                                asChild
                            >
                                <Link href="/library/search?sort=popular">View Full Rankings</Link>
                            </Button>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
}
