"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    Search,
    Globe,
    Sun,
    Moon,
    Menu,
    X,
    ChevronDown,
    Flame,
    Droplets,
    BarChart3,
    Shield,
    BookOpen,
    Compass,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ── Mega Menu Data ──
const explorePrograms = [
    { icon: Flame, label: "Drilling", href: "/explore/drilling", color: "#F5C518" },
    { icon: Droplets, label: "Reservoir", href: "/explore/reservoir", color: "#2DD4BF" },
    { icon: BarChart3, label: "Production", href: "/explore/production", color: "#D4A017" },
    { icon: Shield, label: "HSE", href: "/explore/hse", color: "#22C55E" },
    { icon: GraduationCap, label: "LNG", href: "/explore/lng", color: "#2DD4BF" },
    { icon: BookOpen, label: "Economics", href: "/explore/economics", color: "#F5C518" },
];

const exploreLinks = [
    {
        title: "Learning",
        links: [
            { label: "All Programs", href: "/explore" },
            { label: "Learning Paths", href: "/paths" },
            { label: "Certifications", href: "/certifications" },
        ],
    },
    {
        title: "Knowledge",
        links: [
            { label: "Technical Library", href: "/library" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Articles & Insights", href: "/articles" },
        ],
    },
    {
        title: "Career",
        links: [
            { label: "Job Board", href: "/jobs" },
            { label: "Mentorship", href: "/mentorship" },
            { label: "CV Builder", href: "/cv-builder" },
        ],
    },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { label: "Companies", href: "/companies" },
        { label: "Library", href: "/library" },
        { label: "Community", href: "/community" },
        { label: "About", href: "/about" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-[100] transition-all duration-300 border-b",
                isScrolled
                    ? "h-16 bg-navy-900/80 backdrop-blur-xl border-navy-500/30 shadow-sm"
                    : "h-20 bg-transparent border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

                {/* ── Left: Logo ── */}
                <Link href="/" className="flex items-center gap-2.5 group outline-none">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm group-hover:shadow-gold-md transition-shadow">
                        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-navy-900" />
                    </div>
                    <div>
                        <span className="block text-lg sm:text-xl font-display font-bold text-white tracking-tight leading-none group-hover:text-primary-light transition-colors">
                            HELM
                        </span>
                        <span className="block text-[9px] sm:text-[10px] font-body text-primary tracking-[0.2em] uppercase mt-0.5">
                            Academy
                        </span>
                    </div>
                </Link>

                {/* ── Center: Desktop Navigation ── */}
                <nav className="hidden lg:flex items-center h-full">
                    {/* Explore Mega Menu Toggle */}
                    <div
                        className="h-full flex items-center px-4"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                        <button className="flex items-center gap-1.5 text-sm font-medium font-body text-navy-200 hover:text-white transition-colors h-full outline-none">
                            Explore
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 transition-transform duration-200",
                                    megaMenuOpen && "rotate-180 text-primary"
                                )}
                            />
                        </button>

                        {/* Mega Menu Dropdown */}
                        <AnimatePresence>
                            {megaMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] p-6 glass-strong shadow-card-hover border border-navy-500/50 rounded-xl mt-2 grid grid-cols-12 gap-8 before:absolute before:-top-4 before:inset-x-0 before:h-4 overflow-hidden"
                                >
                                    {/* Left Column: Programs Grid */}
                                    <div className="col-span-7">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-white font-display text-lg">Engineering Programs</h4>
                                            <Link href="/explore" className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
                                                View all <ChevronDown className="h-3 w-3 -rotate-90" />
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {explorePrograms.map((prog) => {
                                                const Icon = prog.icon;
                                                return (
                                                    <Link
                                                        key={prog.label}
                                                        href={prog.href}
                                                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-navy-700/50 border border-transparent hover:border-navy-500/50 transition-colors group"
                                                    >
                                                        <div className="w-8 h-8 rounded bg-navy-800 flex items-center justify-center border border-navy-600 group-hover:border-primary/30 transition-colors">
                                                            <Icon className="h-4 w-4" style={{ color: prog.color }} />
                                                        </div>
                                                        <span className="text-sm font-medium text-navy-100 group-hover:text-white">{prog.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Right Column: Links */}
                                    <div className="col-span-5 grid grid-cols-2 gap-6 bg-navy-800/30 -m-6 p-6 border-l border-navy-500/30">
                                        {exploreLinks.slice(0, 2).map((col) => (
                                            <div key={col.title} className="space-y-4">
                                                <h5 className="text-xs font-bold text-navy-300 uppercase tracking-wider">{col.title}</h5>
                                                <ul className="space-y-2.5">
                                                    {col.links.map((link) => (
                                                        <li key={link.label}>
                                                            <Link href={link.href} className="text-sm text-navy-100 hover:text-primary transition-colors">
                                                                {link.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        <div className="col-span-2 space-y-4 mt-2 pt-4 border-t border-navy-500/30">
                                            <h5 className="text-xs font-bold text-navy-300 uppercase tracking-wider">{exploreLinks[2].title}</h5>
                                            <ul className="grid grid-cols-2 gap-2.5">
                                                {exploreLinks[2].links.map((link) => (
                                                    <li key={link.label}>
                                                        <Link href={link.href} className="text-sm text-navy-100 hover:text-primary transition-colors">
                                                            {link.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-4 p-3 rounded-md bg-gradient-to-r from-navy-800 to-navy-700 border border-primary/20 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <Compass className="h-4 w-4 text-primary" />
                                                    <span className="text-sm font-medium text-white">Engineering Tools</span>
                                                </div>
                                                <Badge variant="warning" size="sm" className="scale-90 opacity-80 group-hover:opacity-100 transition-opacity">Coming Soon</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Standard Links */}
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={cn(
                                    "relative px-4 h-full flex items-center text-sm font-medium font-body transition-colors hover:text-white",
                                    isActive ? "text-white" : "text-navy-200"
                                )}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 inset-x-4 h-0.5 bg-gradient-gold rounded-t-sm"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Right: Actions ── */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-1 mr-2">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-navy-200 hover:text-white hover:bg-navy-800 transition-colors">
                            <Search className="h-4 w-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center text-navy-200 hover:text-white hover:bg-navy-800 transition-colors">
                            <Globe className="h-4 w-4" />
                        </button>
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-navy-200 hover:text-white hover:bg-navy-800 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3 border-l border-navy-500/50 pl-6">
                        <Link href="/login">
                            <Button variant="outline" size="sm">Log In</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="primary" size="sm">Register</Button>
                        </Link>
                    </div>
                </div>

                {/* ── Mobile Menu Toggle ── */}
                <button
                    className="lg:hidden p-2 -mr-2 text-navy-200 hover:text-white"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-[110] lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-navy-900 border-l border-navy-500/50 z-[120] lg:hidden flex flex-col shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-navy-500/30">
                                <span className="font-display font-bold text-lg text-white tracking-tight">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-md hover:bg-navy-800 text-navy-200 hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                                {/* Mobile Explore Section */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-navy-400 uppercase tracking-wider px-2">Explore Programs</h4>
                                    <div className="grid grid-cols-1 gap-1">
                                        {explorePrograms.map((prog) => {
                                            const Icon = prog.icon;
                                            return (
                                                <Link
                                                    key={prog.label}
                                                    href={prog.href}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-navy-800 transition-colors"
                                                >
                                                    <Icon className="h-5 w-5" style={{ color: prog.color }} />
                                                    <span className="text-base font-medium text-navy-100">{prog.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="h-px bg-navy-500/30" />

                                {/* Mobile Standard Links */}
                                <div className="space-y-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className="block p-3 rounded-lg text-base font-medium text-navy-100 hover:bg-navy-800 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Actions Footer */}
                            <div className="p-4 border-t border-navy-500/30 bg-navy-900/50 space-y-3">
                                <div className="flex items-center justify-around pb-4 mb-4 border-b border-navy-500/30">
                                    <button className="text-navy-300 hover:text-white flex flex-col items-center gap-1">
                                        <Search className="h-5 w-5" />
                                        <span className="text-[10px] uppercase">Search</span>
                                    </button>
                                    <button className="text-navy-300 hover:text-white flex flex-col items-center gap-1">
                                        <Globe className="h-5 w-5" />
                                        <span className="text-[10px] uppercase">Ar / En</span>
                                    </button>
                                    {mounted && (
                                        <button
                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                            className="text-navy-300 hover:text-white flex flex-col items-center gap-1"
                                        >
                                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                            <span className="text-[10px] uppercase">Theme</span>
                                        </button>
                                    )}
                                </div>

                                <Link href="/login" className="block w-full">
                                    <Button variant="outline" className="w-full justify-center">Log In</Button>
                                </Link>
                                <Link href="/register" className="block w-full">
                                    <Button variant="primary" className="w-full justify-center">Register</Button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
