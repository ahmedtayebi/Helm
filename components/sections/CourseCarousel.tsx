"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardImage } from "@/components/ui/card";
import { useThemeColors } from "@/lib/useThemeColors";

// Mock latest courses data
const courses = [
    {
        id: "1",
        title: "Advanced Drilling Fluid Engineering",
        instructor: "Dr. Lamine Bouziane",
        rating: 4.9,
        reviews: 128,
        price: 99,
        category: "Drilling",
        image: "https://images.unsplash.com/photo-1541888049-74d2fc0020bb?auto=format&fit=crop&q=80&w=600",
        duration: "12h 30m",
        lessons: 24,
    },
    {
        id: "2",
        title: "Reservoir Simulation with Eclipse",
        instructor: "Eng. Farid Khaled",
        rating: 4.8,
        reviews: 84,
        price: 149,
        category: "Reservoir",
        image: "https://images.unsplash.com/photo-1621696803273-0ceb6ff2f716?auto=format&fit=crop&q=80&w=600",
        duration: "18h 45m",
        lessons: 32,
        badge: "Bestseller",
    },
    {
        id: "3",
        title: "Artificial Lift Systems Optimization",
        instructor: "Eng. Sarah M.",
        rating: 4.7,
        reviews: 56,
        price: 0,
        category: "Production",
        image: "https://images.unsplash.com/photo-1582046808799-a67bfe5b3319?auto=format&fit=crop&q=80&w=600",
        duration: "8h 15m",
        lessons: 16,
        badge: "Free",
    },
    {
        id: "4",
        title: "Process Safety in LNG Operations",
        instructor: "Dr. Ahmed Benali",
        rating: 4.9,
        reviews: 210,
        price: 79,
        category: "HSE",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
        duration: "10h 00m",
        lessons: 18,
    },
    {
        id: "5",
        title: "Petroleum Economics & Risk Analysis",
        instructor: "Eng. Youssef T.",
        rating: 4.6,
        reviews: 42,
        price: 129,
        category: "Economics",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
        duration: "14h 20m",
        lessons: 28,
    },
];

export function CourseCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const t = useThemeColors();

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            const newScroll = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({
                left: newScroll,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className={`section-padding ${t.sectionBg} border-b ${t.borderMuted} overflow-hidden`} ref={containerRef}>
            <div className="section-container mb-10">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <Badge variant="success" className={`mb-4 ${t.heading}`}>New Arrivals</Badge>
                        <h2 className={`font-display text-3xl md:text-4xl ${t.heading}`}>
                            Latest <span className="text-gradient-gold">Courses</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className={`w-10 h-10 rounded-full border ${t.borderFaint} flex items-center justify-center ${t.body} hover:text-primary hover:border-primary/50 transition-colors ${t.cardBgSubtle}`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className={`w-10 h-10 rounded-full border ${t.borderFaint} flex items-center justify-center ${t.body} hover:text-primary hover:border-primary/50 transition-colors ${t.cardBgSubtle}`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative w-full max-w-[100vw] overflow-hidden">
                {/* Left Gradient Mask */}
                <div className={`invisible lg:visible absolute left-0 inset-y-0 w-12 bg-gradient-to-r ${t.fadeFrom} to-transparent z-10 pointer-events-none`} />

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-4 sm:px-6 lg:px-8"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            className="min-w-[300px] max-w-[300px] sm:min-w-[340px] sm:max-w-[340px] snap-start shrink-0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card variant="glass" className={`h-full flex flex-col group hover:shadow-gold-glow ${t.borderMuted}`}>
                                <div className="relative">
                                    <CardImage
                                        src={course.image}
                                        alt={course.title}
                                        className="h-44 group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        <Badge variant="default" className={`${t.isDark ? "bg-navy-900/80" : "bg-white/90"} backdrop-blur-md ${t.heading} border-primary/30`}>
                                            {course.category}
                                        </Badge>
                                        {course.badge && (
                                            <Badge variant={course.badge === "Free" ? "success" : "warning"} className={`${t.isDark ? "bg-navy-900/80" : "bg-white/90"} backdrop-blur-md shadow-sm`}>
                                                {course.badge}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Meta Stats */}
                                    <div className={`flex items-center gap-4 text-xs ${t.body} font-body mb-3`}>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Video className="h-3.5 w-3.5 text-primary" />
                                            {course.lessons} lessons
                                        </div>
                                    </div>

                                    <h3 className={`font-display font-semibold text-lg ${t.heading} mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors`}>
                                        {course.title}
                                    </h3>

                                    <p className={`text-sm ${t.muted} mb-4`}>{course.instructor}</p>

                                    <div className={`mt-auto flex items-center justify-between pt-4 border-t ${t.borderMuted}`}>
                                        {/* Rating */}
                                        <div className="flex items-center gap-1.5">
                                            <Star className="h-4 w-4 fill-primary text-primary" />
                                            <span className={`text-sm font-semibold ${t.heading}`}>{course.rating}</span>
                                            <span className={`text-xs ${t.muted}`}>({course.reviews})</span>
                                        </div>

                                        {/* Price */}
                                        <div className={`font-display font-bold text-lg ${t.heading}`}>
                                            {course.price === 0 ? (
                                                <span className="text-success tracking-wide uppercase text-sm">Free</span>
                                            ) : (
                                                `$${course.price}`
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Spacer for right scrolling padding */}
                    <div className="min-w-[1px] shrink-0" />
                </div>

                {/* Right Gradient Mask */}
                <div className={`invisible lg:visible absolute right-0 inset-y-0 w-24 bg-gradient-to-l ${t.fadeFrom} to-transparent z-10 pointer-events-none`} />
            </div>
        </section>
    );
}
