import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import { MOCK_COURSES } from "@/data/courses";
import { CourseCard } from "@/components/shared/CourseCard";
import { Button } from "@/components/ui/button";

interface CategoryPageProps {
    params: {
        category: string;
    };
}

const categoryInfo: Record<string, { title: string; desc: string; gradient: string; glow: string }> = {
    drilling: {
        title: "Drilling Engineering",
        desc: "Master well design, drilling fluids, bit selection, and directional drilling operations with industry-backed curriculum.",
        gradient: "from-[#FF4500]/80 to-[#FF4500]/0",
        glow: "bg-[#FF4500]",
    },
    reservoir: {
        title: "Reservoir Engineering",
        desc: "Advanced training in reservoir simulation, well testing, reserves estimation, and enhanced oil recovery (EOR).",
        gradient: "from-teal-500/80 to-teal-500/0",
        glow: "bg-teal-500",
    },
    production: {
        title: "Production Engineering",
        desc: "Optimize artificial lift systems, well completions, nodal analysis, and surface facilities for maximum recovery.",
        gradient: "from-primary/80 to-primary/0",
        glow: "bg-primary",
    },
    hse: {
        title: "Health, Safety & Environment",
        desc: "Industry-standard HSE management, risk assessment, process safety, and operational safety protocols.",
        gradient: "from-green-500/80 to-green-500/0",
        glow: "bg-green-500",
    },
    lng: {
        title: "LNG Technology",
        desc: "Deep dive into liquefied natural gas processing, transport, cryogenic materials, and storage systems.",
        gradient: "from-cyan-500/80 to-cyan-500/0",
        glow: "bg-cyan-500",
    },
    economics: {
        title: "Petroleum Economics",
        desc: "Economic evaluation, risk analysis, project finance, and asset valuation in the oil & gas sector.",
        gradient: "from-purple-500/80 to-purple-500/0",
        glow: "bg-purple-500",
    },
};

export default function CategoryPage({ params }: CategoryPageProps) {
    const categoryKey = params.category.toLowerCase();
    const info = categoryInfo[categoryKey];

    if (!info) {
        notFound();
    }

    const categoryCourses = MOCK_COURSES.filter(
        (c) => c.category.toLowerCase() === categoryKey
    );

    return (
        <main className="min-h-screen bg-navy-950 pb-20">

            {/* Dynamic Hero Banner */}
            <section className="relative pt-32 pb-20 border-b border-navy-500/30 overflow-hidden">
                {/* Gradients */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-gradient-to-b ${info.gradient} opacity-20 pointer-events-none`} />
                <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full ${info.glow} opacity-10 blur-[150px] pointer-events-none`} />

                <div className="section-container relative z-10">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-navy-300 mb-8 font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/explore/programs" className="hover:text-primary transition-colors">Explore</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">{info.title}</span>
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
                            {info.title}
                        </h1>
                        <p className="text-xl text-navy-200 font-body leading-relaxed mb-10">
                            {info.desc}
                        </p>
                        <Button size="lg" className="shadow-lg shadow-black/50 border border-white/10 glass-strong">
                            View All {categoryCourses.length} Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Program List */}
            <section className="section-padding">
                <div className="section-container">

                    <div className="flex justify-between items-center mb-10 border-b border-navy-600/50 pb-4">
                        <h2 className="text-2xl font-display text-white">Recommended Programs</h2>
                        <Button variant="outline" size="sm" className="hidden sm:flex" leftIcon={<Filter className="w-4 h-4" />}>
                            Filter Results
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryCourses.map((course, idx) => (
                            <CourseCard key={course.id} course={course} index={idx} />
                        ))}
                    </div>

                </div>
            </section>

        </main>
    );
}
