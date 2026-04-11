"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookMarked, Download, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useThemeColors } from "@/lib/useThemeColors";

const featuredBooks = [
    {
        id: 1,
        title: "Applied Drilling Engineering",
        author: "Bourgoyne, Milheim, Chenevert",
        type: "Textbook",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 2,
        title: "Reservoir Engineering Handbook",
        author: "Tarek Ahmed",
        type: "Reference",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 3,
        title: "Well Testing: SPE Monograph",
        author: "John Lee",
        type: "SPE Paper",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 4,
        title: "Production Optimization",
        author: "H. Dale Beggs",
        type: "Textbook",
        cover: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=400",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 },
    },
};

export function LibraryPreview() {
    const t = useThemeColors();

    return (
        <section className={`section-padding ${t.isDark ? "bg-[#0A1118]" : "bg-[#F0F4F8]"} relative overflow-hidden`}>
            {/* Background Gold Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${t.isDark ? "bg-navy-800/20" : "bg-slate-300/20"} rounded-full blur-[100px] pointer-events-none`} />

            <div className="section-container relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Left Text Column */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-gold shadow-gold-md mb-6 sm:mb-8">
                            <BookMarked className="h-6 w-6 sm:h-8 sm:w-8 text-navy-900" />
                        </div>

                        <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl ${t.heading} mb-6 leading-tight`}>
                            Access Our Elite <br className="hidden lg:block" />
                            <span className="text-gradient-gold">Technical Library</span>
                        </h2>

                        <p className={`${t.body} font-body text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0`}>
                            Stop hunting for fragmented resources. Get instant access to over 5,000+ curated textbooks, SPE papers, technical guidelines, and case studies—all organized by specialization.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                            <div className={`flex items-center gap-2 ${t.isDark ? "text-navy-100" : "text-slate-700"} font-medium`}>
                                <FileText className="h-5 w-5 text-primary" />
                                <span>Textbooks & Manuals</span>
                            </div>
                            <div className={`hidden sm:block w-1.5 h-1.5 rounded-full ${t.isDark ? "bg-navy-600" : "bg-slate-300"}`} />
                            <div className={`flex items-center gap-2 ${t.isDark ? "text-navy-100" : "text-slate-700"} font-medium`}>
                                <Download className="h-5 w-5 text-primary" />
                                <span>Downloadable PDFs</span>
                            </div>
                        </div>

                        <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                            Explore Full Library
                        </Button>
                    </motion.div>

                    {/* Right Cards Column */}
                    <motion.div
                        className="flex-[1.2] w-full"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">

                            {/* Center Decorative Element */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${t.cardBg} border border-primary/20 flex items-center justify-center shadow-gold-glow z-20 hidden sm:flex`}>
                                <BookMarked className="h-6 w-6 text-primary" />
                            </div>

                            {featuredBooks.map((book, idx) => (
                                <motion.div
                                    key={book.id}
                                    variants={itemVariants}
                                    className={`relative group ${idx % 2 === 1 ? 'sm:mt-12' : ''}`}
                                >
                                    <div className={`aspect-[3/4] rounded-xl overflow-hidden relative shadow-card border ${t.borderFaint} group-hover:border-primary/50 transition-colors`}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                                        />
                                        <div className={`absolute inset-x-0 bottom-0 ${t.isDark ? "bg-gradient-to-t from-navy-950 via-navy-900/80 to-transparent" : "bg-gradient-to-t from-slate-900/90 via-slate-800/60 to-transparent"} p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform`}>
                                            <Badge variant="outline" className={`${t.isDark ? "bg-navy-950/80" : "bg-slate-900/70"} backdrop-blur-md text-[10px] mb-2 border-primary/30 text-primary-light`}>
                                                {book.type}
                                            </Badge>
                                            <h4 className="text-white font-display font-medium text-sm sm:text-base leading-tight mb-1">
                                                {book.title}
                                            </h4>
                                            <p className="text-navy-300 text-xs truncate">
                                                {book.author}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
