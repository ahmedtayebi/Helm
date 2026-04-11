"use client";

import { useTheme } from "next-themes";
import { useIsMounted } from "@/lib/useIsMounted";

/**
 * Shared hook for theme-aware colors.
 *
 * Before the component mounts on the client, `isDark` is forced to
 * `true` so the SSR pass and the very first client paint both render
 * dark mode. This eliminates the hydration flash without requiring
 * every consumer to add its own mounted guard.
 */
export function useThemeColors() {
    const { theme } = useTheme();
    const mounted = useIsMounted();

    // Before mount: default to dark so SSR HTML ≡ first client paint.
    const isDark = !mounted || theme === "dark";

    return {
        isDark,

        // ── Backgrounds ──
        bg: isDark ? "#060E1A" : "#F5F7FA",
        bgAlt: isDark ? "#0A1628" : "#F0F4F8",
        bgSecondary: isDark ? "#0F2040" : "#EDF0F5",
        bgCard: isDark ? "#132238" : "#FFFFFF",
        surface: isDark ? "#1A2E4A" : "#E8EDF5",

        // ── Text ──
        text: isDark ? "#E8EDF5" : "#0D1B2A",
        textMuted: isDark ? "#A8B8D0" : "#4A5568",

        // ── Borders ──
        border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",

        // ── Grid overlay for inline styles ──
        gridLine: isDark
            ? "rgba(212,160,23,0.4)"
            : "rgba(160,120,16,0.35)",

        // ── Tailwind class helpers ──

        // Section backgrounds
        sectionBg: isDark ? "bg-navy-900" : "bg-[#F0F4F8]",
        sectionBgAlt: isDark ? "bg-navy-950" : "bg-[#E8EDF5]",

        // Card / surface backgrounds
        cardBg: isDark ? "bg-navy-900" : "bg-white",
        cardBgSubtle: isDark ? "bg-navy-800" : "bg-slate-100",
        cardBgMuted: isDark ? "bg-navy-800/60" : "bg-slate-50",

        // Text classes
        heading: isDark ? "text-white" : "text-[#0D1B2A]",
        body: isDark ? "text-navy-200" : "text-slate-600",
        muted: isDark ? "text-navy-300" : "text-slate-500",
        subtle: isDark ? "text-navy-400" : "text-slate-400",
        faint: isDark ? "text-navy-500" : "text-slate-400",

        // Border classes
        borderClass: isDark ? "border-navy-800" : "border-slate-200",
        borderSubtle: isDark ? "border-navy-700" : "border-slate-200",
        borderMuted: isDark ? "border-navy-500/30" : "border-slate-200/80",
        borderFaint: isDark ? "border-navy-500/50" : "border-slate-200",
        borderAccent: isDark ? "border-navy-600" : "border-slate-300",

        // Interactive / hover
        hoverBg: isDark ? "hover:bg-navy-800" : "hover:bg-slate-100",
        hoverBgSubtle: isDark ? "hover:bg-navy-700/50" : "hover:bg-slate-50",

        // Gradient fades (for scroll masks, bottom fades, etc.)
        fadeFrom: isDark ? "from-navy-900" : "from-[#F0F4F8]",
        fadeFromAlt: isDark ? "from-navy-950" : "from-[#E8EDF5]",
        bottomFade: isDark ? "from-[#060E1A]" : "from-[#F5F7FA]",

        // Hero particle / gradient overlay
        gradientOverlay: isDark
            ? "from-navy-900/40 via-[#060E1A] to-[#060E1A]"
            : "from-slate-200/40 via-[#EDF0F5] to-[#EDF0F5]",

        // Backdrop / overlay
        overlayBg: isDark ? "bg-navy-950/80" : "bg-slate-900/20",
        backdropBg: isDark ? "bg-navy-900/80" : "bg-[#F0F4F8]/90",
        inputBg: isDark ? "bg-navy-800/80" : "bg-white",
    } as const;
}
