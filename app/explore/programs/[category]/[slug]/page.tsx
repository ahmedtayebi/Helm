"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    PlayCircle, Star, Clock, Users, ChevronRight,
    MonitorPlay, FileText, Award, Infinity, Share2,
    Gift, CheckCircle2, ChevronDown
} from "lucide-react";
import { MOCK_COURSES } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CoursePageProps {
    params: {
        category: string;
        slug: string;
    };
}

const TABS = ["Overview", "Curriculum", "Instructor", "Reviews"];

export default function CourseDetailPage({ params }: CoursePageProps) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const course = MOCK_COURSES.find(c => c.slug === params.slug);

    if (!course) {
        notFound();
    }

    // Mock Curriculum Data
    const curriculumSections = [
        { title: "Module 1: Fundamentals & Theory", lessons: 4, time: "2h 15m" },
        { title: "Module 2: Advanced Equipment", lessons: 6, time: "4h 30m" },
        { title: "Module 3: Field Operations", lessons: 5, time: "3h 45m" },
        { title: "Module 4: Safety & Troubleshooting", lessons: 3, time: "1h 50m" },
    ];

    return (
        <main className="min-h-screen bg-navy-950 pb-20 pt-24 border-t border-navy-500/30">

            {/* Dark Hero Header */}
            <section className="bg-navy-900 border-b border-navy-600 pb-12 pt-8">
                <div className="section-container">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-navy-300 mb-6 font-medium">
                        <Link href="/explore/programs" className="hover:text-primary transition-colors">Programs</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href={`/explore/programs/${params.category}`} className="hover:text-primary transition-colors capitalize">
                            {params.category}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white truncate max-w-[200px] sm:max-w-md">{course.title}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left Content (Title & Video) */}
                        <div className="flex-[2.2] w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-wider">
                                    {course.category}
                                </Badge>
                                {course.isPopular && <Badge variant="warning">Best Seller</Badge>}
                            </div>

                            <h1 className="font-display text-3xl md:text-5xl text-white leading-tight mb-4">
                                {course.title}
                            </h1>

                            <p className="text-navy-200 text-lg font-body leading-relaxed mb-6">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy-300 mb-8">
                                <div className="flex items-center gap-1.5 text-primary">
                                    <span className="font-bold text-base">{course.rating}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`w-4 h-4 ${s <= Math.floor(course.rating) ? 'fill-primary' : 'fill-navy-600 text-navy-600'}`} />
                                        ))}
                                    </div>
                                    <a href="#reviews" className="text-navy-200 hover:text-white transition-colors underline decoration-navy-500 underline-offset-4 ml-1">
                                        ({course.reviewsCount.toLocaleString()} ratings)
                                    </a>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.durationHours} hours total</span>
                                </div>
                            </div>

                            {/* Video Player Placeholder */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-navy-950 border border-navy-600 shadow-2xl group cursor-pointer group mb-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-navy-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-300 shadow-xl">
                                        <PlayCircle className="w-10 h-10 text-white group-hover:text-navy-950 transition-colors" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                                    <Badge variant="outline" className="bg-navy-950/80 backdrop-blur text-white border-none py-1">Preview Course</Badge>
                                </div>
                            </div>

                        </div>

                        {/* Right Content (Sticky Pricing Card) - Desktop Only for now (moves to bottom on mobile usually, but keeping it simple) */}
                        <div className="flex-1 hidden lg:block relative">
                            {/* Fixed spacer for sticky positioning relative to container */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="relative">
                <div className="section-container relative">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Left Column (70%) */}
                        <div className="flex-[2.2] w-full pt-8">

                            {/* Tabs */}
                            <div className="flex items-center gap-8 border-b border-navy-600 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-base font-medium transition-colors relative outline-none ${activeTab === tab ? 'text-white' : 'text-navy-300 hover:text-navy-100'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[500px]">
                                <AnimatePresence mode="wait">

                                    {activeTab === "Overview" && (
                                        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-8">
                                            <div>
                                                <h2 className="text-2xl font-display text-white mb-4">What you&apos;ll learn</h2>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {[
                                                        "Analyze and interpret complex field data accurately.",
                                                        "Design systems using industry-standard software.",
                                                        "Implement advanced safety protocols and risk mitigation.",
                                                        "Optimize operations for maximum economic recovery."
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                            <span className="text-navy-200 text-sm leading-relaxed">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h2 className="text-2xl font-display text-white mb-4">Requirements</h2>
                                                <ul className="list-disc list-inside text-navy-200 text-sm space-y-2 marker:text-navy-500">
                                                    <li>Basic understanding of petroleum engineering principles.</li>
                                                    <li>A computer with Windows 10/11 for software installation.</li>
                                                    <li>No prior field experience required, but helpful.</li>
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "Curriculum" && (
                                        <motion.div key="curriculum" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-display text-white">Course Content</h2>
                                                <span className="text-navy-300 text-sm">{curriculumSections.length} sections • {course.durationHours}h total length</span>
                                            </div>

                                            <div className="border border-navy-600 rounded-xl overflow-hidden">
                                                {curriculumSections.map((section, idx) => (
                                                    <div key={idx} className="border-b border-navy-600 last:border-0">
                                                        <button
                                                            onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                                                            className="w-full bg-navy-800/50 hover:bg-navy-800 p-4 flex items-center justify-between transition-colors outline-none"
                                                        >
                                                            <div className="flex items-center gap-4 text-left">
                                                                <ChevronDown className={`w-5 h-5 text-navy-400 transition-transform duration-300 ${openAccordion === idx ? 'rotate-180' : ''}`} />
                                                                <span className="text-white font-medium">{section.title}</span>
                                                            </div>
                                                            <span className="text-navy-300 text-sm hidden sm:block whitespace-nowrap">
                                                                {section.lessons} lessons • {section.time}
                                                            </span>
                                                        </button>

                                                        <AnimatePresence>
                                                            {openAccordion === idx && (
                                                                <motion.div
                                                                    initial={{ height: 0 }}
                                                                    animate={{ height: "auto" }}
                                                                    exit={{ height: 0 }}
                                                                    className="overflow-hidden bg-navy-950"
                                                                >
                                                                    <div className="p-4 space-y-1">
                                                                        {[...Array(section.lessons)].map((_, lessonIdx) => (
                                                                            <div key={lessonIdx} className="flex justify-between items-center p-2 hover:bg-navy-900 rounded-lg group cursor-pointer transition-colors">
                                                                                <div className="flex items-center gap-3">
                                                                                    <PlayCircle className="w-4 h-4 text-navy-400 group-hover:text-primary transition-colors" />
                                                                                    <span className="text-navy-200 text-sm group-hover:text-white transition-colors underline decoration-transparent group-hover:decoration-navy-500 underline-offset-4">
                                                                                        Lesson {idx + 1}.{lessonIdx + 1}: Core Concepts & Application
                                                                                    </span>
                                                                                </div>
                                                                                {lessonIdx === 0 && <span className="text-primary text-xs underline underline-offset-2">Preview</span>}
                                                                                {lessonIdx !== 0 && <span className="text-navy-400 text-xs">15:00</span>}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "Instructor" && (
                                        <motion.div key="instructor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                                            <h2 className="text-2xl font-display text-white mb-6">Meet your instructor</h2>
                                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-32 h-32 rounded-2xl object-cover border-2 border-primary/20" />
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">{course.instructor.name}</h3>
                                                    <p className="text-primary text-sm font-medium mb-4">{course.instructor.role}</p>

                                                    <div className="flex gap-4 text-sm text-navy-200 font-medium mb-4">
                                                        <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-primary fill-primary" /> 4.8 Instructor Rating</span>
                                                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> 24,000+ Students</span>
                                                    </div>

                                                    <p className="text-navy-300 text-sm leading-relaxed max-w-2xl">
                                                        An industry veteran with over 15 years of field experience across the MENA region. Specializes in advanced operational troubleshooting and has trained hundreds of young engineers working in top tier supermajors.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "Reviews" && (
                                        <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                            <div className="flex items-end gap-4 mb-8">
                                                <h2 className="text-5xl font-display text-white">{course.rating}</h2>
                                                <div className="pb-1 text-navy-300">
                                                    <div className="flex mb-1">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} className={`w-5 h-5 ${s <= Math.floor(course.rating) ? 'fill-primary text-primary' : 'fill-navy-600 text-navy-600'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-medium">Course Rating • {course.reviewsCount} Ratings</span>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {[1, 2, 3].map((r) => (
                                                    <div key={r} className="border-t border-navy-600 pt-6">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center font-bold text-navy-300 uppercase">
                                                                    A{r}
                                                                </div>
                                                                <div>
                                                                    <div className="text-white font-medium text-sm">Ahmed Engineer</div>
                                                                    <div className="flex text-primary">
                                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                                            <Star key={s} className="w-3 h-3 fill-primary" />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="text-xs text-navy-400">2 months ago</span>
                                                        </div>
                                                        <p className="text-sm text-navy-200 leading-relaxed">
                                                            This course was incredibly practical. The examples provided by the instructor perfectly matched what we see in the field. Highly recommended for any junior engineer looking to level up.
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>

                        </div>

                        {/* Right Column (30% - Sticky Card Overlaying Header) */}
                        <aside className="w-full lg:w-[340px] lg:absolute lg:top-[-260px] lg:right-0 z-20">
                            <div className="bg-navy-900 border border-navy-500 shadow-2xl rounded-2xl overflow-hidden sticky top-32">

                                {/* Mobile Thumbnail (shows only if on mobile since desktop has the big one) */}
                                <div className="aspect-video lg:hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-6">
                                        <span className="text-4xl font-display font-bold text-white block">
                                            {course.price === 0 ? "Free" : `$${course.price}`}
                                        </span>
                                        <span className="text-sm text-navy-300 line-through mr-2">
                                            {course.price === 0 ? "" : `$${course.price + 100}`}
                                        </span>
                                        {course.price > 0 && <span className="text-xs text-primary font-bold uppercase tracking-wider">82% off today</span>}
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <Button size="lg" className="w-full shadow-gold-md">
                                            Enroll Now
                                        </Button>
                                        <Button variant="outline" size="lg" className="w-full">
                                            Add to Wishlist
                                        </Button>
                                    </div>

                                    <p className="text-xs text-center text-navy-300 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 mb-8">
                                        <h4 className="font-bold text-white text-sm">This course includes:</h4>
                                        <ul className="space-y-3 text-sm text-navy-200">
                                            <li className="flex items-center gap-3"><MonitorPlay className="w-4 h-4 text-navy-400" /> {course.durationHours} hours on-demand video</li>
                                            <li className="flex items-center gap-3"><FileText className="w-4 h-4 text-navy-400" /> 15 articles & downloadable resources</li>
                                            <li className="flex items-center gap-3"><Infinity className="w-4 h-4 text-navy-400" /> Full lifetime access</li>
                                            <li className="flex items-center gap-3"><Award className="w-4 h-4 text-navy-400" /> Certificate of completion</li>
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-navy-600 pt-6">
                                        <button className="flex items-center gap-2 text-sm font-medium text-navy-300 hover:text-white transition-colors">
                                            <Share2 className="w-4 h-4" /> Share
                                        </button>
                                        <button className="flex items-center gap-2 text-sm font-medium text-navy-300 hover:text-white transition-colors">
                                            <Gift className="w-4 h-4" /> Gift this course
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

        </main>
    );
}
