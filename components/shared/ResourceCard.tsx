"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen, FileText, FileBadge, GraduationCap,
    Download, Lock, Bookmark, Star, Calendar, FileJson
} from "lucide-react";

import { LibraryResource } from "@/data/library";

interface ResourceCardProps {
    resource: LibraryResource;
    index?: number;
}

const typeIcons = {
    "Book": BookOpen,
    "Research Paper": FileText,
    "Summary": FileBadge,
    "Graduation Project": GraduationCap,
};

const typeColors = {
    "Book": "text-blue-400 bg-blue-500/10 border-blue-500/30",
    "Research Paper": "text-purple-400 bg-purple-500/10 border-purple-500/30",
    "Summary": "text-green-400 bg-green-500/10 border-green-500/30",
    "Graduation Project": "text-orange-400 bg-orange-500/10 border-orange-500/30",
};

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
    const Icon = typeIcons[resource.type] || FileText;
    const colorClass = typeColors[resource.type] || typeColors["Research Paper"];

    // Synthetic Cover (Book Spine Design)
    const syntheticCover = (
        <div className={`w-full h-full bg-gradient-to-br ${resource.coverGradient || 'from-navy-800 to-navy-950'} flex flex-col p-4 relative overflow-hidden`}>
            {/* Book spine elements */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 border-r border-slate-200 dark:border-white/10 shadow-[inset_4px_0_8px_rgba(0,0,0,0.5)]" />
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/20" />
            <div className="absolute left-8 top-0 bottom-0 w-12 bg-white/5" />

            <div className="z-10 ml-8 mt-auto h-full flex flex-col justify-end">
                <h4 className="font-display text-white text-lg leading-tight mb-2 drop-shadow-md">
                    {resource.title}
                </h4>
                <p className="text-white/70 text-xs font-medium">
                    {resource.author}
                </p>
            </div>

            <div className="absolute top-4 right-4 z-10 opacity-30">
                <Icon className="w-12 h-12 text-white" />
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="group cursor-pointer outline-none flex flex-col h-full"
            onClick={() => {
                // Mock click handler for opening modal
                console.log("Open Resource:", resource.id);
            }}
        >
            <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-600 rounded-2xl overflow-hidden shadow-card hover:shadow-gold-glow hover:border-primary/50 transition-all duration-300 flex-1 flex flex-col relative">

                {/* Floating Actions */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                    <button
                        className="w-8 h-8 rounded-full bg-white/60 dark:bg-navy-950/60 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-navy-200 hover:text-[#0D1B2A] dark:hover:text-white hover:border-primary hover:bg-slate-100 dark:hover:bg-navy-800 transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Bookmark action
                        }}
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>

                {/* Thumbnail Setup */}
                <div className="relative aspect-[3/4] sm:aspect-[4/3] bg-slate-100 dark:bg-navy-950 overflow-hidden border-b border-slate-200 dark:border-navy-600">

                    {/* Cover Render */}
                    {resource.coverImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={resource.coverImage}
                            alt={resource.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                    ) : (
                        syntheticCover
                    )}

                    {/* Type Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md backdrop-blur-md border ${colorClass} flex items-center gap-1.5`}>
                            <Icon className="w-3 h-3" />
                            {resource.type}
                        </span>
                    </div>

                    {/* Premium Lock Overlay */}
                    {resource.isPremium && (
                        <div className="absolute bottom-3 right-3 z-10">
                            <div className="bg-gradient-gold p-1.5 rounded-full shadow-lg border border-yellow-200/50">
                                <Lock className="w-4 h-4 text-navy-950" />
                            </div>
                        </div>
                    )}

                    {/* Hover CTA Download */}
                    <div className="absolute inset-0 bg-slate-900/60 dark:bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-sm">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center">
                            {resource.isPremium ? (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-navy-800 border-2 border-primary/50 flex items-center justify-center mb-3">
                                        <Lock className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="font-medium text-white text-sm bg-slate-800/80 dark:bg-navy-900/80 px-4 py-1.5 rounded-full border border-slate-600 dark:border-navy-600">Unlock Premium</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary text-primary flex items-center justify-center mb-3 hover:bg-primary hover:text-navy-950 transition-colors">
                                        <Download className="w-5 h-5 ml-0.5" />
                                    </div>
                                    <span className="font-medium text-white text-sm bg-slate-800/80 dark:bg-navy-900/80 px-4 py-1.5 rounded-full border border-slate-600 dark:border-navy-600">Download PDF</span>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* Info Area */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Meta Row */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-navy-300 font-medium mb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {resource.year}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-100 dark:bg-navy-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-navy-200">
                                {resource.language}
                            </span>
                        </div>
                        <span className="flex items-center gap-1 bg-slate-50 dark:bg-navy-800/50 px-2 py-0.5 rounded-full text-primary border border-primary/20">
                            {resource.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0D1B2A] dark:text-white font-display text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2" title={resource.title}>
                        {resource.title}
                    </h3>

                    {/* Description Preview */}
                    <p className="text-sm text-slate-500 dark:text-navy-300 line-clamp-2 leading-relaxed mb-4">
                        {resource.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-navy-600/50 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm bg-slate-100 dark:bg-navy-950 px-2 py-1 rounded border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-navy-200 shadow-inner">
                            <FileJson className="w-3.5 h-3.5 text-slate-400 dark:text-navy-400" />
                            {resource.pageCount}p
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-sm font-medium text-[#0D1B2A] dark:text-white">{resource.rating}</span>
                            <span className="text-xs text-slate-400 dark:text-navy-400">({resource.reviewsCount})</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
