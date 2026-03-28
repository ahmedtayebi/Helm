"use client";

import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Award, Library, Briefcase, User,
    GraduationCap, Upload, BarChart3, Users,
    CreditCard, Search as SearchIcon, ChevronLeft, ChevronRight,
    Bell, Settings, LogOut, Menu, X
} from "lucide-react";

/* ─── Types ─────────────────────────────────────── */
type Role = "student" | "instructor" | "company";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const NAV_ITEMS: Record<Role, NavItem[]> = {
    student: [
        { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
        { label: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
        { label: "Certificates", href: "/dashboard/student/certificates", icon: Award },
        { label: "Library", href: "/dashboard/student/library", icon: Library },
        { label: "Applications", href: "/dashboard/student/applications", icon: Briefcase },
        { label: "Profile", href: "/dashboard/student/profile", icon: User },
    ],
    instructor: [
        { label: "Overview", href: "/dashboard/instructor", icon: LayoutDashboard },
        { label: "My Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
        { label: "Upload Course", href: "/dashboard/instructor/upload", icon: Upload },
        { label: "Analytics", href: "/dashboard/instructor/analytics", icon: BarChart3 },
        { label: "Students", href: "/dashboard/instructor/students", icon: GraduationCap },
    ],
    company: [
        { label: "Overview", href: "/dashboard/company", icon: LayoutDashboard },
        { label: "Job Listings", href: "/dashboard/company/jobs", icon: Briefcase },
        { label: "Applicants", href: "/dashboard/company/applicants", icon: Users },
        { label: "Talent Search", href: "/dashboard/company/talent", icon: SearchIcon },
        { label: "Subscription", href: "/dashboard/company/subscription", icon: CreditCard },
    ],
};

const ROLE_META: Record<Role, { label: string; badge: string; avatar: string; name: string }> = {
    student: { label: "Student", badge: "bg-teal-500/15 text-teal-400 border-teal-500/30", avatar: "AH", name: "Ahmed Hadjali" },
    instructor: { label: "Instructor", badge: "bg-primary/15 text-primary border-primary/30", avatar: "KB", name: "Dr. Karim Bouzid" },
    company: { label: "Company", badge: "bg-purple-500/15 text-purple-400 border-purple-500/30", avatar: "SN", name: "Sonatrach" },
};

/* ─── Context ──────────────────────────────────── */
interface DashCtx { collapsed: boolean; toggle: () => void; role: Role; }
const DashboardContext = createContext<DashCtx>({ collapsed: false, toggle: () => {}, role: "student" });
export const useDashboard = () => useContext(DashboardContext);

function detectRole(path: string): Role {
    if (path.includes("/instructor")) return "instructor";
    if (path.includes("/company")) return "company";
    return "student";
}

/* ─── Sidebar ──────────────────────────────────── */
function Sidebar({ collapsed, toggle, role, mobileOpen, onMobileClose }: {
    collapsed: boolean; toggle: () => void; role: Role; mobileOpen: boolean; onMobileClose: () => void
}) {
    const pathname = usePathname();
    const items = NAV_ITEMS[role];
    const meta = ROLE_META[role];

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className={`flex items-center h-16 border-b border-navy-800 px-4 ${collapsed ? "justify-center" : "gap-3"}`}>
                <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <span className="text-navy-950 font-display font-bold text-sm">H</span>
                    </div>
                    {!collapsed && <span className="font-display text-lg text-white whitespace-nowrap">HELM</span>}
                </Link>
                <button onClick={toggle} className="hidden lg:flex ml-auto text-navy-500 hover:text-white transition-colors p-1 rounded">
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                {/* Mobile close */}
                <button onClick={onMobileClose} className="lg:hidden ml-auto text-navy-400 hover:text-white p-1">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {items.map(item => {
                    const isActive = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href} onClick={onMobileClose}
                            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-navy-400 hover:text-white hover:bg-navy-800/60"
                            }`}>
                            {isActive && (
                                <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-primary" />
                            )}
                            <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : "text-navy-500 group-hover:text-white"}`} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User */}
            <div className={`border-t border-navy-800 px-3 py-4 ${collapsed ? "flex justify-center" : ""}`}>
                <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center text-xs font-display font-bold text-primary flex-shrink-0">
                        {meta.avatar}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-medium truncate">{meta.name}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${meta.badge}`}>{meta.label}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop */}
            <aside className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-[#060E1A] border-r border-navy-800 z-40 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"}`}>
                {sidebarContent}
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-40 lg:hidden" onClick={onMobileClose} />
                        <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 left-0 h-screen w-64 bg-[#060E1A] border-r border-navy-800 z-50 lg:hidden">
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── TopBar ───────────────────────────────────── */
function TopBar({ title, onMenuClick }: { title: string; onMenuClick: () => void }) {
    return (
        <header className="sticky top-0 z-30 h-16 bg-navy-900/80 backdrop-blur-xl border-b border-navy-800 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="lg:hidden text-navy-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-800 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="font-display text-lg text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <button className="relative p-2 rounded-xl text-navy-400 hover:text-white hover:bg-navy-800 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
                </button>
                <button className="p-2 rounded-xl text-navy-400 hover:text-white hover:bg-navy-800 transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
                <Link href="/auth/login" className="p-2 rounded-xl text-navy-400 hover:text-red-400 hover:bg-navy-800 transition-colors">
                    <LogOut className="w-5 h-5" />
                </Link>
            </div>
        </header>
    );
}

/* ─── Page title resolver ──────────────────────── */
function resolveTitle(path: string): string {
    const map: Record<string, string> = {
        "/dashboard/student": "Dashboard",
        "/dashboard/student/courses": "My Courses",
        "/dashboard/student/certificates": "Certificates",
        "/dashboard/student/library": "Saved Library",
        "/dashboard/student/applications": "Applications",
        "/dashboard/student/profile": "My Profile",
        "/dashboard/instructor": "Dashboard",
        "/dashboard/instructor/courses": "My Courses",
        "/dashboard/instructor/upload": "Upload Course",
        "/dashboard/instructor/analytics": "Analytics",
        "/dashboard/instructor/students": "Students",
        "/dashboard/company": "Dashboard",
        "/dashboard/company/jobs": "Job Listings",
        "/dashboard/company/applicants": "Applicants",
        "/dashboard/company/talent": "Talent Search",
        "/dashboard/company/subscription": "Subscription",
    };
    return map[path] || "Dashboard";
}

/* ─── Layout ───────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const role = detectRole(pathname);
    const title = resolveTitle(pathname);

    return (
        <DashboardContext.Provider value={{ collapsed, toggle: () => setCollapsed(c => !c), role }}>
            <div className="min-h-screen bg-navy-900">
                <Sidebar collapsed={collapsed} toggle={() => setCollapsed(c => !c)} role={role}
                    mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
                <div className={`transition-all duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}>
                    <TopBar title={title} onMenuClick={() => setMobileOpen(true)} />
                    <main className="p-4 lg:p-6 max-w-7xl mx-auto">{children}</main>
                </div>
            </div>
        </DashboardContext.Provider>
    );
}
