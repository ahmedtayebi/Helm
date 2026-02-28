"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Download, Lock, Share2, Bookmark, Star, Calendar, FileJson,
    CheckCircle2, BookOpen, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LibraryResource } from "@/data/library";

interface ResourceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    resource: LibraryResource | null;
}

export function ResourceDetailModal({ isOpen, onClose, resource }: ResourceDetailModalProps) {
    if (!isOpen || !resource) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-5xl bg-navy-900 border border-navy-600 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-navy-950/50 backdrop-blur border border-white/10 flex items-center justify-center text-navy-200 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col md:flex-row h-full overflow-y-auto overflow-x-hidden md:overflow-hidden">

                        {/* Left Column: Visuals & Actions */}
                        <div className="w-full md:w-[40%] bg-navy-950 p-6 md:p-10 flex flex-col border-r border-navy-600/50 relative overflow-y-auto">

                            <div className="mb-6 w-[80%] max-w-[280px] aspect-[3/4] mx-auto rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] border border-navy-600 relative group">
                                {resource.coverImage ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={resource.coverImage} alt={resource.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${resource.coverGradient || 'from-navy-800 to-navy-950'} flex flex-col p-6 relative`}>
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 border-r border-white/10 shadow-[inset_4px_0_8px_rgba(0,0,0,0.5)]" />
                                        <div className="z-10 ml-6 mt-auto h-full flex flex-col justify-end">
                                            <h4 className="font-display text-white text-2xl leading-none mb-3 drop-shadow-md">{resource.title}</h4>
                                            <p className="text-white/70 font-medium">{resource.author}</p>
                                        </div>
                                    </div>
                                )}

                                {resource.isPremium && (
                                    <div className="absolute top-4 right-4 bg-gradient-gold p-1.5 rounded-full shadow-lg">
                                        <Lock className="w-4 h-4 text-navy-950" />
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 mt-auto">
                                {resource.isPremium ? (
                                    <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 mb-4">
                                        <p className="text-sm text-yellow-200/80 flex items-start gap-2 mb-3">
                                            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            This is a premium resource. Unlock HELM Pro to get full access to this and thousands of other documents.
                                        </p>
                                        <Button className="w-full bg-gradient-gold text-navy-950 hover:opacity-90 font-bold border-none shadow-gold-sm">
                                            Upgrade to Pro Now
                                        </Button>
                                    </div>
                                ) : (
                                    <Button size="lg" className="w-full font-bold shadow-gold-md" asChild>
                                        <a href="#" download>
                                            <Download className="w-5 h-5 mr-2" />
                                            Download {resource.type === "Book" ? "eBook PDF" : "PDF"}
                                        </a>
                                    </Button>
                                )}

                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 bg-navy-900 border-navy-600 hover:border-primary">
                                        <Bookmark className="w-4 h-4 mr-2" /> Save
                                    </Button>
                                    <Button variant="outline" className="flex-1 bg-navy-900 border-navy-600 hover:border-primary">
                                        <Share2 className="w-4 h-4 mr-2" /> Share
                                    </Button>
                                </div>
                            </div>

                            {/* Mini Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-navy-800 text-center">
                                <div>
                                    <p className="text-xs text-navy-400 mb-1">Downloads</p>
                                    <p className="text-lg font-display text-white">{(resource.downloadCount / 1000).toFixed(1)}k</p>
                                </div>
                                <div>
                                    <p className="text-xs text-navy-400 mb-1">Rating</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <span className="text-lg font-display text-white">{resource.rating}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Details */}
                        <div className="w-full md:w-[60%] p-6 md:p-10 md:overflow-y-auto custom-scrollbar">

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className="bg-primary/20 text-primary border-primary/50 pointer-events-none">
                                    {resource.type}
                                </Badge>
                                <Badge variant="outline" className="border-navy-600 pointer-events-none">
                                    {resource.category}
                                </Badge>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-display text-white leading-tight mb-2">
                                {resource.title}
                            </h2>
                            <p className="text-lg text-navy-200 mb-6">
                                By <span className="text-primary">{resource.author}</span>
                            </p>

                            <div className="flex flex-wrap gap-4 md:gap-8 mb-8 pb-8 border-b border-navy-600/50 text-sm font-medium text-navy-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Published {resource.year}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileJson className="w-4 h-4" /> {resource.pageCount} Pages
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-navy-800 text-xs">EN</span> English
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <h3 className="text-xl font-display text-white mb-4">About this Resource</h3>
                                <p className="text-navy-200 leading-relaxed text-lg">
                                    {resource.description}
                                </p>
                                {/* Mock extended description content for visual bulk */}
                                <p className="text-navy-300 leading-relaxed mt-4">
                                    This comprehensive guide is designed for petroleum engineering professionals and students seeking to deepen their understanding of {resource.category.toLowerCase()} concepts. Featuring real-world case studies, advanced mathematical models, and industry best practices.
                                </p>
                            </div>

                            {/* Table of Contents Preview */}
                            <div className="mb-10 p-6 rounded-2xl bg-navy-950/50 border border-navy-600/30">
                                <h3 className="text-lg font-display text-white mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    Table of Contents Preview
                                </h3>
                                <ul className="space-y-3">
                                    {['Introduction & Fundamentals', 'Advanced Design Considerations', 'Case Studies & Practical Application', 'Industry Standards & Guidelines'].map((chap, i) => (
                                        <li key={i} className="flex items-center justify-between text-navy-200 text-sm group cursor-pointer">
                                            <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                                <CheckCircle2 className="w-4 h-4 text-navy-500" />
                                                Chapter {i + 1}: {chap}
                                            </span>
                                            <span className="text-navy-500 text-xs shadow-inner bg-navy-900 px-2 py-0.5 rounded">p. {i * 45 + 1}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="ghost" className="text-primary mt-4 p-0 h-auto font-medium hover:bg-transparent hover:underline">
                                    View Full Contents <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
