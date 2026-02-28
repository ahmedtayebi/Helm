"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe2, Briefcase, Workflow, Settings, Zap, Hexagon, Component } from "lucide-react";

// Placeholder company icons since we don't have actual SVG logos
const companies = [
    { name: "Global Energy Corp", icon: Globe2 },
    { name: "MENA Petroleum", icon: Building2 },
    { name: "DeepDrill Tech", icon: Settings },
    { name: "AeroReserve", icon: Workflow },
    { name: "Nexus Oil", icon: Hexagon },
    { name: "Atlas LNG", icon: Component },
    { name: "Prime Power", icon: Zap },
    { name: "Continental Gas", icon: Briefcase },
];

// Double the array for seamless infinite scrolling
const marqueeCompanies = [...companies, ...companies];

export function CompaniesMarquee() {
    return (
        <section className="py-16 md:py-24 bg-navy-950 border-t border-navy-500/30 overflow-hidden relative">
            <div className="section-container relative z-10">
                <div className="text-center mb-12">
                    <p className="text-sm md:text-base font-body text-navy-300 uppercase tracking-[0.2em]">
                        Trusted by the world&apos;s leading energy companies
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden flex flex-col items-center">

                    {/* Gradient Masks for fade effect */}
                    <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Track */}
                    <motion.div
                        className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 30, // Adjust speed
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    >
                        {marqueeCompanies.map((company, index) => {
                            const Icon = company.icon;
                            return (
                                <div
                                    key={`${company.name}-${index}`}
                                    className="flex items-center gap-3 text-navy-400 opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer"
                                >
                                    <Icon className="w-8 h-8 md:w-10 md:h-10" />
                                    <span className="font-display font-medium text-lg md:text-xl tracking-wide">{company.name}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
