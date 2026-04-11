"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const POPULAR_TERMS = ["Well Control", "Eclipse", "Drilling Fluids", "NODAL"];

export function LibraryHeroSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/library/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push(`/library/search`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-gold rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border border-slate-300 dark:border-navy-500 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <div className="pl-4 pr-2">
                    <Search className="w-6 h-6 text-slate-400 dark:text-navy-400 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                    type="text"
                    placeholder="Search by title, author, keyword, or ISBN..."
                    className="flex-1 bg-transparent border-none text-[#0D1B2A] dark:text-white text-lg h-14 placeholder:text-slate-400 dark:placeholder:text-navy-400 focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="lg" className="h-14 px-8 rounded-xl font-bold shadow-gold-md">
                    Search
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-slate-500 dark:text-navy-300">
                <span className="mr-2">Popular:</span>
                {POPULAR_TERMS.map((term, i) => (
                    <span key={term}>
                        <button
                            type="button"
                            onClick={() => setSearchQuery(term)}
                            className="hover:text-primary transition-colors hover:underline underline-offset-4"
                        >
                            {term}
                        </button>
                        {i < POPULAR_TERMS.length - 1 && ","}
                    </span>
                ))}
            </div>
        </form>
    );
}
