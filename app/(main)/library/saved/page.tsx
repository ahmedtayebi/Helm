"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Library, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_LIBRARY } from "@/data/library";
import { ResourceCard } from "@/components/shared/ResourceCard";

export default function SavedResources() {
    // Mock saved state - in reality this would be pulled from a global context or database
    const [savedItems, setSavedItems] = useState(MOCK_LIBRARY.slice(2, 5));

    const handleRemove = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <main className="min-h-screen bg-white dark:bg-navy-950 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6">
                            <Bookmark className="w-6 h-6" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl text-[#0D1B2A] dark:text-white mb-4">
                            My Saved <span className="text-gradient-gold">Resources</span>
                        </h1>
                        <p className="text-slate-600 dark:text-navy-300 text-lg max-w-2xl">
                            Quickly access the books, papers, and summaries you&apos;ve bookmarked for later reading.
                        </p>
                    </div>

                    {savedItems.length > 0 && (
                        <div className="text-slate-600 dark:text-navy-300 text-sm font-medium bg-slate-100 dark:bg-navy-900 px-4 py-2 rounded-lg border border-slate-300 dark:border-navy-600">
                            {savedItems.length} items saved
                        </div>
                    )}
                </div>

                {/* Content Area */}
                {savedItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {savedItems.map((resource) => (
                                <motion.div
                                    key={resource.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.3 }}
                                    className="relative group block"
                                >
                                    <ResourceCard resource={resource} index={0} />

                                    {/* Remove override button for the saved page */}
                                    <button
                                        onClick={(e) => handleRemove(resource.id, e)}
                                        className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/30 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 hover:border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                                        title="Remove from saved"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-6 max-w-2xl mx-auto text-center border border-dashed border-slate-300 dark:border-navy-600 rounded-3xl bg-slate-50/80 dark:bg-navy-900/30 backdrop-blur-sm"
                    >
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-gradient-gold blur-[40px] opacity-20 rounded-full" />
                            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-navy-800 border-2 border-primary/30 flex items-center justify-center relative z-10 shadow-gold-sm">
                                <Library className="w-10 h-10 text-primary" />
                            </div>

                            {/* Floating aesthetic elements */}
                            <div className="absolute -top-2 -right-4 w-8 h-8 rounded-full bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-600 flex items-center justify-center z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                                <Bookmark className="w-4 h-4 text-slate-400 dark:text-navy-400" />
                            </div>
                        </div>

                        <h2 className="font-display text-3xl text-[#0D1B2A] dark:text-white mb-4">Your reading list is empty</h2>
                        <p className="text-slate-600 dark:text-navy-300 text-lg mb-10 leading-relaxed">
                            You haven&apos;t saved any resources yet. Browse our extensive library of petroleum engineering books, research papers, and summaries to build your personal knowledge base.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="lg" className="shadow-gold-md" asChild>
                                <Link href="/library">
                                    <Library className="w-5 h-5 mr-2" />
                                    Browse Library
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="glass" asChild>
                                <Link href="/library/search">
                                    <Search className="w-5 h-5 mr-2" />
                                    Search Resources
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}

            </div>
        </main>
    );
}
