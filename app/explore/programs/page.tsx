"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { CourseCard } from "@/components/shared/CourseCard";
import { MOCK_COURSES } from "@/data/courses";

export default function ExplorePrograms() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular"); // popular, newest, rated
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({
        category: [],
        level: [],
        language: [],
        price: [],
    });
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Filter Categories
    const categories = ["Drilling", "Reservoir", "Production", "HSE", "LNG", "Economics"];
    const levels = ["Beginner", "Intermediate", "Advanced"];
    const languages = ["AR", "EN", "FR"];
    const prices = ["Free", "Paid"];

    const toggleFilter = (type: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[type];
            if (current.includes(value)) {
                return { ...prev, [type]: current.filter((item) => item !== value) };
            }
            return { ...prev, [type]: [...current, value] };
        });
    };

    const clearFilters = () => {
        setActiveFilters({ category: [], level: [], language: [], price: [] });
        setSearchQuery("");
    };

    // Compute Total Active Filters
    const totalActiveFilters = Object.values(activeFilters).flat().length + (searchQuery ? 1 : 0);

    // Filter & Sort Logic
    const filteredCourses = useMemo(() => {
        let result = [...MOCK_COURSES];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (c) =>
                    c.title.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    c.instructor.name.toLowerCase().includes(q)
            );
        }

        // Category
        if (activeFilters.category.length > 0) {
            result = result.filter((c) => activeFilters.category.includes(c.category));
        }

        // Level
        if (activeFilters.level.length > 0) {
            result = result.filter((c) => activeFilters.level.includes(c.level));
        }

        // Language
        if (activeFilters.language.length > 0) {
            result = result.filter((c) => activeFilters.language.includes(c.language));
        }

        // Price
        if (activeFilters.price.length > 0) {
            result = result.filter((c) => {
                const isFree = c.price === 0;
                if (activeFilters.price.includes("Free") && isFree) return true;
                if (activeFilters.price.includes("Paid") && !isFree) return true;
                return false;
            });
        }

        // Sorting
        if (sortBy === "popular") {
            result.sort((a, b) => b.enrolledCount - a.enrolledCount);
        } else if (sortBy === "rated") {
            result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "newest") {
            // Assuming isNew is a proxy for newest
            result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        }

        return result;
    }, [searchQuery, activeFilters, sortBy]);

    return (
        <main className="min-h-screen bg-navy-950 pt-28 pb-20">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[400px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="mb-10 text-center md:text-left">
                    <Badge variant="outline" className="mb-4">Explore</Badge>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        Programs & <span className="text-gradient-gold">Courses</span>
                    </h1>
                    <p className="text-navy-200 text-lg max-w-2xl font-body">
                        Discover our comprehensive curriculum designed by industry experts to advance your petroleum engineering career.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 relative">

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
                                    { label: "Most Popular", value: "popular" },
                                    { label: "Highest Rated", value: "rated" },
                                    { label: "Newest Arrivals", value: "newest" },
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

                            {/* Categories */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Specialization</h3>
                                <div className="space-y-3">
                                    {categories.map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeFilters.category.includes(cat) ? 'bg-primary border-primary' : 'bg-navy-900 border-navy-500 group-hover:border-primary/50'}`}>
                                                {activeFilters.category.includes(cat) && <CheckIcon />}
                                            </div>
                                            <span className={`text-sm ${activeFilters.category.includes(cat) ? 'text-white' : 'text-navy-300 group-hover:text-white transition-colors'}`}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Level */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Level</h3>
                                <div className="space-y-3">
                                    {levels.map((lvl) => (
                                        <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeFilters.level.includes(lvl) ? 'bg-primary border-primary' : 'bg-navy-900 border-navy-500 group-hover:border-primary/50'}`}>
                                                {activeFilters.level.includes(lvl) && <CheckIcon />}
                                            </div>
                                            <span className={`text-sm ${activeFilters.level.includes(lvl) ? 'text-white' : 'text-navy-300 group-hover:text-white transition-colors'}`}>{lvl}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pricing</h3>
                                <div className="flex gap-3">
                                    {prices.map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => toggleFilter('price', p)}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${activeFilters.price.includes(p) ? 'bg-primary/10 border-primary text-primary' : 'bg-navy-900 border-navy-600 text-navy-300 hover:border-navy-400'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Language */}
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Language</h3>
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
                            <div className="relative w-full sm:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                                <Input
                                    type="text"
                                    placeholder="Search courses, instructors..."
                                    className="pl-10 h-12 bg-navy-900 border-navy-600 focus:border-primary text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="hidden lg:flex items-center gap-3 w-64">
                                <ArrowUpDown className="w-5 h-5 text-navy-400" />
                                <Select
                                    options={[
                                        { label: "Most Popular", value: "popular" },
                                        { label: "Highest Rated", value: "rated" },
                                        { label: "Newest Arrivals", value: "newest" },
                                    ]}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        <AnimatePresence>
                            {totalActiveFilters > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap gap-2 mb-6"
                                >
                                    {Object.entries(activeFilters).map(([type, values]) =>
                                        values.map((val) => (
                                            <Badge key={`${type}-${val}`} variant="warning" className="flex items-center gap-1.5 bg-navy-900">
                                                {val}
                                                <button onClick={() => toggleFilter(type, val)} className="hover:text-red-400 transition-colors">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))
                                    )}
                                    {searchQuery && (
                                        <Badge variant="warning" className="flex items-center gap-1.5 bg-navy-900">
                                            Search: &quot;{searchQuery}&quot;
                                            <button onClick={() => setSearchQuery("")} className="hover:text-red-400 transition-colors">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, idx) => (
                                        <CourseCard key={course.id} course={course} index={idx} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-20 text-center flex flex-col items-center border border-dashed border-navy-600 rounded-2xl bg-navy-900/50"
                                    >
                                        <Search className="w-12 h-12 text-navy-500 mb-4" />
                                        <h3 className="text-xl text-white font-display mb-2">No courses found</h3>
                                        <p className="text-navy-300">Try adjusting your filters or search query.</p>
                                        <Button variant="outline" className="mt-6" onClick={clearFilters}>Reset Filters</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}

// Simple Check Icon for custom checkboxes
function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="#060E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
