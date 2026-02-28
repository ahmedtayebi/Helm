"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Users, Bookmark, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Course, CATEGORY_COLORS } from "@/data/courses";

interface CourseCardProps {
    course: Course;
    index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
    const catColor = CATEGORY_COLORS[course.category];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group outline-none"
        >
            <Link href={`/explore/programs/${course.category.toLowerCase()}/${course.slug}`} className="block h-full">
                <div className="h-full bg-navy-900 border border-navy-600 rounded-2xl overflow-hidden shadow-card hover:shadow-gold-glow hover:border-primary/50 transition-all duration-300 flex flex-col relative">

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
                        <div className="flex flex-col gap-2">
                            <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm backdrop-blur-md ${catColor.bg} ${catColor.text} ${catColor.border} border`}>
                                {course.category}
                            </span>
                            {(course.isPopular || course.isNew) && (
                                <Badge variant={course.isPopular ? "warning" : "success"} className="shadow-lg pointer-events-auto">
                                    {course.isPopular ? "Popular" : "New"}
                                </Badge>
                            )}
                        </div>
                        <button
                            className="w-8 h-8 rounded-full bg-navy-900/80 backdrop-blur-md border border-navy-500 flex items-center justify-center text-navy-200 hover:text-primary hover:border-primary transition-colors pointer-events-auto"
                            onClick={(e) => {
                                e.preventDefault();
                                // Bookmark logic here
                            }}
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Thumbnail & Hover Overlay */}
                    <div className="relative aspect-video overflow-hidden bg-navy-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-90 opacity-90"
                        />

                        {/* Hover Play Button */}
                        <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/90 text-navy-950 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <PlayCircle className="w-6 h-6 fill-navy-950/20" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                        {/* Meta tags */}
                        <div className="flex items-center gap-3 text-xs text-navy-300 font-medium mb-3">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                {course.durationHours}h
                            </span>
                            <span className="w-1 h-1 rounded-full bg-navy-600" />
                            <span>{course.level}</span>
                            <span className="w-1 h-1 rounded-full bg-navy-600" />
                            <span>{course.language}</span>
                        </div>

                        {/* Title & Instructor */}
                        <h3 className="text-white font-display text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                        </h3>

                        <p className="text-navy-300 text-sm mb-4 line-clamp-2">
                            {course.description}
                        </p>

                        {/* Bottom Section anchors to bottom */}
                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-4 border-b border-navy-600/50 pb-4">
                                <div className="flex items-center gap-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={course.instructor.avatar} alt={course.instructor.name} className="w-6 h-6 rounded-full border border-navy-500 object-cover" />
                                    <span className="text-sm font-medium text-navy-200">{course.instructor.name}</span>
                                </div>

                                <div className="flex items-center gap-1 text-sm">
                                    <span className="text-primary font-bold">{course.rating}</span>
                                    <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                                    <span className="text-navy-400 text-xs">({course.reviewsCount})</span>
                                </div>
                            </div>

                            {/* Price & Enrolled */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-navy-300 text-sm">
                                    <Users className="w-4 h-4" />
                                    <span>{course.enrolledCount.toLocaleString()} built</span>
                                </div>

                                <div className="font-display font-bold text-lg">
                                    {course.price === 0 ? (
                                        <span className="text-gradient-gold">FREE</span>
                                    ) : (
                                        <span className="text-white">${course.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
