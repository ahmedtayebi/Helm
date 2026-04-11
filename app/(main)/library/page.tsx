import React from "react";
import Link from "next/link";
import { Library, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { getLibraryResources, getFeaturedResources } from "@/lib/supabase/library";
import { LibraryHeroSearch } from "./_components/LibraryHeroSearch";
import { LibraryBrowse } from "./_components/LibraryBrowse";

export default async function LibraryHome() {
    const [allResources, featuredResources] = await Promise.all([
        getLibraryResources(),
        getFeaturedResources(),
    ]);

    return (
        <main className="min-h-screen bg-[var(--color-bg)] pb-20">

            {/* Hero Search Section */}
            <section className="relative pt-32 pb-24 border-b border-slate-200 dark:border-navy-500/30 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none" />

                <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-6 bg-white/50 dark:bg-navy-900/50 backdrop-blur border-primary/30 text-primary">
                        <Library className="w-4 h-4 mr-2 inline" />
                        HELM Academy Digital Library
                    </Badge>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-[#0D1B2A] dark:text-white mb-6 leading-tight drop-shadow-2xl">
                        Your Petroleum <br />
                        <span className="text-gradient-gold">Knowledge Hub</span>
                    </h1>

                    <p className="text-slate-500 dark:text-navy-200 text-lg md:text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed">
                        Access thousands of premium books, industry research papers, operational summaries, and top graduation projects.
                    </p>

                    <LibraryHeroSearch />
                </div>
            </section>

            {/* Featured Resources */}
            <section className="section-padding relative border-b border-slate-200 dark:border-navy-600/30 bg-slate-50/50 dark:bg-navy-950/50">
                <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-teal-500/5 to-transparent pointer-events-none" />
                <div className="section-container relative z-10">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-display text-[#0D1B2A] dark:text-white flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Featured Selections
                            </h2>
                            <p className="text-slate-500 dark:text-navy-300 mt-2">
                                Editor&apos;s picks and highly recommended readings.
                            </p>
                        </div>
                        <Button variant="ghost" className="hidden sm:flex" asChild>
                            <Link href="/library/search?featured=true">
                                View all <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    {featuredResources.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredResources.map((resource, idx) => (
                                <ResourceCard key={resource.id} resource={resource} index={idx} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 dark:text-navy-400 text-center py-12">
                            No featured resources at the moment.
                        </p>
                    )}
                </div>
            </section>

            {/* Browse + Popular This Week */}
            <LibraryBrowse allResources={allResources} />

        </main>
    );
}
