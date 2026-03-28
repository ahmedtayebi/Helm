"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { MOCK_LIBRARY } from "@/data/library";
import { ResourceCard } from "@/components/shared/ResourceCard";

function LibrarySearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const initialType = searchParams.get("type") || "";
    const isFeatured = searchParams.get("featured") === "true";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [sortBy, setSortBy] = useState("relevant"); // relevant, newest, popular
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({
        type: initialType ? [initialType] : [],
        category: [],
        language: [],
        access: [], // "Free", "Premium"
    });

    // Sync state if URL changes (simplified for mock demo)
    useEffect(() => {
        if (initialQuery) setSearchQuery(initialQuery);
        if (initialType) setActiveFilters(prev => ({ ...prev, type: [initialType] }));
    }, [initialQuery, initialType]);

    const toggleFilter = (group: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[group];
            if (current.includes(value)) {
                return { ...prev, [group]: current.filter((item) => item !== value) };
            }
            return { ...prev, [group]: [...current, value] };
        });
    };

    const clearFilters = () => {
        setActiveFilters({ type: [], category: [], language: [], access: [] });
        setSearchQuery("");
    };

    const totalActiveFilters = Object.values(activeFilters).flat().length + (searchQuery ? 1 : 0) + (isFeatured ? 1 : 0);

    // Filter & Sort Logic
    const filteredResources = useMemo(() => {
        let result = [...MOCK_LIBRARY];

        if (isFeatured) {
            result = result.filter(r => r.isFeatured);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    r.author.toLowerCase().includes(q) ||
                    r.description.toLowerCase().includes(q) ||
                    r.category.toLowerCase().includes(q)
            );
        }

        if (activeFilters.type.length > 0) {
            result = result.filter((r) => activeFilters.type.includes(r.type));
        }

        if (activeFilters.category.length > 0) {
            result = result.filter((r) => activeFilters.category.includes(r.category));
        }

        if (activeFilters.language.length > 0) {
            result = result.filter((r) => activeFilters.language.includes(r.language));
        }

        if (activeFilters.access.length > 0) {
            result = result.filter((r) => {
                if (activeFilters.access.includes("Free") && !r.isPremium) return true;
                if (activeFilters.access.includes("Premium") && r.isPremium) return true;
                return false;
            });
        }

        // Sorting
        if (sortBy === "popular") {
            result.sort((a, b) => b.downloadCount - a.downloadCount);
        } else if (sortBy === "newest") {
            result.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        }
        // "relevant" keeps it mostly as is since we don't have a real relevance engine, 
        // but we can sort by rating just to make it dynamic.
        else if (sortBy === "relevant") {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [searchQuery, activeFilters, sortBy, isFeatured]);

    return (
        <main className="min-h-screen bg-navy-950 pt-28 pb-20 border-t border-navy-500/30">

            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="mb-10 mt-4">
                    <h1 className="font-display text-4xl text-white mb-2">
                        Search <span className="text-gradient-gold">Resources</span>
                    </h1>
                    <p className="text-navy-300">Browse and filter thousands of items in the HELM digital library.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
                        <Button
                            variant="outline"
                            className="w-full flex justify-center bg-navy-900"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                        </Button>

                        <div className="w-48">
                            <Select
                                options={[
                                    { label: "Most Relevant", value: "relevant" },
                                    { label: "Most Popular", value: "popular" },
                                    { label: "Newest Additions", value: "newest" },
                                ]}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-72 lg:flex-shrink-0 space-y-8 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="glass p-6 rounded-2xl border border-navy-600 sticky top-28">

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-display text-xl text-white flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-primary" />
                                    Filters
                                </h2>
                                {totalActiveFilters > 0 && (
                                    <button onClick={clearFilters} className="text-sm text-navy-300 hover:text-primary transition-colors">
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {/* Resource Type */}
                            <FilterGroup
                                title="Format"
                                options={["Book", "Research Paper", "Summary", "Graduation Project"]}
                                active={activeFilters.type}
                                onToggle={(val) => toggleFilter('type', val)}
                            />

                            {/* Category */}
                            <FilterGroup
                                title="Topic"
                                options={["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"]}
                                active={activeFilters.category}
                                onToggle={(val) => toggleFilter('category', val)}
                            />

                            {/* Access */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Access Level</h3>
                                <div className="flex gap-3">
                                    {["Free", "Premium"].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => toggleFilter('access', p)}
                                            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-sm font-medium rounded-lg border transition-all ${activeFilters.access.includes(p)
                                                ? (p === "Premium" ? 'bg-gradient-gold shadow-gold-sm border-yellow-200/50 text-navy-950' : 'bg-primary/20 border-primary text-primary')
                                                : 'bg-navy-900 border-navy-600 text-navy-300 hover:border-navy-400'
                                                }`}
                                        >
                                            {p === "Premium" && <Lock className={`w-3.5 h-3.5 ${activeFilters.access.includes(p) ? 'text-navy-950' : 'text-primary'}`} />}
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Language */}
                            <div className="mb-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Language</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["AR", "EN", "FR"].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => toggleFilter('language', lang)}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-all ${activeFilters.language.includes(lang) ? 'bg-primary/10 border-primary text-primary' : 'bg-navy-900 border-navy-600 text-navy-300 hover:border-navy-400'}`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 w-full flex flex-col min-w-0">

                        {/* Top Toolbar */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 bg-navy-900/40 p-2 sm:p-4 rounded-2xl border border-navy-600/50">
                            <div className="relative w-full sm:max-w-xl">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                                <Input
                                    type="text"
                                    placeholder="Search title, author, isbn..."
                                    className="pl-10 h-12 bg-navy-900 border-navy-500 focus:border-primary text-base rounded-xl shadow-inner w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white bg-navy-800 p-1 rounded">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="hidden lg:flex items-center gap-3 min-w-[200px]">
                                <ArrowUpDown className="w-5 h-5 text-navy-400" />
                                <Select
                                    options={[
                                        { label: "Most Relevant", value: "relevant" },
                                        { label: "Most Popular", value: "popular" },
                                        { label: "Newest Arrivals", value: "newest" },
                                    ]}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-12 border-navy-500 bg-navy-900 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Active Filters Summary */}
                        <AnimatePresence>
                            {totalActiveFilters > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap items-center gap-2 mb-6"
                                >
                                    <span className="text-sm text-navy-300 mr-2">Active filters:</span>
                                    {isFeatured && (
                                        <Badge variant="warning" className="flex items-center gap-1.5 bg-navy-900">
                                            Featured Selection
                                            <button onClick={() => {
                                                const url = new URL(window.location.href);
                                                url.searchParams.delete('featured');
                                                window.history.pushState({}, '', url);
                                                // Real app would trigger re-render properly here, mockup relies on logic
                                            }} className="hover:text-red-400 ml-1">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    {Object.entries(activeFilters).map(([type, values]) =>
                                        values.map((val) => (
                                            <Badge key={`${type}-${val}`} variant="outline" className="flex items-center gap-1.5 bg-navy-900/50 border-primary/30 text-white">
                                                {val}
                                                <button onClick={() => toggleFilter(type, val)} className="hover:text-primary transition-colors ml-1">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))
                                    )}
                                    {searchQuery && (
                                        <Badge variant="outline" className="flex items-center gap-1.5 bg-navy-900/50 border-primary/30 text-white">
                                            &quot;{searchQuery}&quot;
                                            <button onClick={() => setSearchQuery("")} className="hover:text-primary transition-colors ml-1">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mb-4 text-sm text-navy-300">
                            Showing <strong>{filteredResources.length}</strong> results
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredResources.length > 0 ? (
                                    filteredResources.map((resource, idx) => (
                                        <ResourceCard key={resource.id} resource={resource} index={idx} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-24 text-center flex flex-col items-center border border-dashed border-navy-600 rounded-2xl bg-navy-900/30 backdrop-blur-sm"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-navy-800 border border-navy-600 flex items-center justify-center mb-6">
                                            <Search className="w-10 h-10 text-navy-400" />
                                        </div>
                                        <h3 className="text-2xl text-white font-display mb-2 drop-shadow-md">No resources found</h3>
                                        <p className="text-navy-300 max-w-md mx-auto mb-8">
                                            We couldn&apos;t find anything matching your current filters and search query. Try adjusting your criteria.
                                        </p>
                                        <Button variant="outline" size="lg" onClick={clearFilters} className="glass">
                                            Clear All Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Placeholder */}
                        {filteredResources.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" disabled className="border-navy-600 text-navy-500">Previous</Button>
                                    <Button variant="primary" size="sm" className="bg-primary text-navy-950">1</Button>
                                    <Button variant="outline" size="sm" className="border-navy-600 hover:border-primary">2</Button>
                                    <Button variant="outline" size="sm" className="border-navy-600 hover:border-primary">3</Button>
                                    <Button variant="outline" size="sm" className="border-navy-600 hover:border-primary">Next</Button>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </main>
    );
}

export default function LibrarySearch() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-navy-950 pt-28 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        }>
            <LibrarySearchContent />
        </Suspense>
    );
}

// Helper component for filter groups
function FilterGroup({ title, options, active, onToggle }: { title: string, options: string[], active: string[], onToggle: (s: string) => void }) {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{title}</h3>
            <div className="space-y-3">
                {options.map((opt) => (
                    <label key={opt} onClick={() => onToggle(opt)} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${active.includes(opt) ? 'bg-primary border-primary shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-navy-900 border-navy-500 group-hover:border-primary/50'}`}>
                            {active.includes(opt) && <CheckIcon />}
                        </div>
                        <span className={`text-sm ${active.includes(opt) ? 'text-white font-medium' : 'text-navy-300 group-hover:text-white transition-colors'}`}>{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
