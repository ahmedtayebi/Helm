"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookMarked, Download, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useThemeColors } from "@/lib/useThemeColors";

const featuredFieldScenes = [
    {
        id: 1,
        title: "West Aglat Nasser 2",
        author: "North of Hassi Messaoud · Sonatrach discovery",
        type: "Drilling Site",
        cover: "https://elraed.dz/media/articles/475265-300322.jpg",
    },
    {
        id: 2,
        title: "Hassi Messaoud Refinery",
        author: "Sonatrach downstream facility",
        type: "Refinery",
        cover: "https://news.radioalgerie.dz/sites/default/data/2024-01/pet.png",
    },
    {
        id: 3,
        title: "Hassi Messaoud Oil Field",
        author: "Algeria's largest Sonatrach-operated oil field",
        type: "Production",
        cover: "https://attaqa.net/wp-content/uploads/2024/10/c6a8488de86eddf87c84edf4136a1126-e1730136027987.jpg",
    },
    {
        id: 4,
        title: "Northern Hassi Messaoud",
        author: "Sonatrach evaluation well operations",
        type: "Field Ops",
        cover: "https://www.sahm-media.dz/wp-content/uploads/2022/03/inbound3036077823015348536.jpg",
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

                            {featuredFieldScenes.map((scene, idx) => (
                                <motion.div
                                    key={scene.id}
                                    variants={itemVariants}
                                    className={`relative group ${idx % 2 === 1 ? 'sm:mt-12' : ''}`}
                                >
                                    <div className={`aspect-[3/4] rounded-xl overflow-hidden relative shadow-card border ${t.borderFaint} group-hover:border-primary/50 transition-colors`}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={scene.cover}
                                            alt={scene.title}
                                            className="w-full h-full object-cover filter brightness-[0.8] group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                                        />
                                        <div className={`absolute inset-x-0 bottom-0 ${t.isDark ? "bg-gradient-to-t from-navy-950 via-navy-900/80 to-transparent" : "bg-gradient-to-t from-slate-900/90 via-slate-800/60 to-transparent"} p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform`}>
                                            <Badge variant="outline" className={`${t.isDark ? "bg-navy-950/80" : "bg-slate-900/70"} backdrop-blur-md text-[10px] mb-2 border-primary/30 text-primary-light`}>
                                                {scene.type}
                                            </Badge>
                                            <h4 className="text-white font-display font-medium text-sm sm:text-base leading-tight mb-1">
                                                {scene.title}
                                            </h4>
                                            <p className="text-navy-300 text-xs truncate">
                                                {scene.author}
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
