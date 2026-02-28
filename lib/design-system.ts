// ============================================
// HELM Academy — Design System Tokens (JS)
// Export design tokens for programmatic access
// ============================================

export const colors = {
    primary: {
        DEFAULT: "#D4A017",
        light: "#F5C518",
        dark: "#A07810",
    },
    bg: {
        DEFAULT: "#0A1628",
        secondary: "#0F2040",
        card: "#132238",
    },
    surface: {
        DEFAULT: "#1A2E4A",
        light: "#243B5C",
        dark: "#132238",
    },
    text: {
        DEFAULT: "#E8EDF5",
        muted: "#8A9BBC",
    },
    accent: {
        DEFAULT: "#2DD4BF",
        light: "#5EEAD4",
        dark: "#14B8A6",
    },
    danger: {
        DEFAULT: "#EF4444",
        light: "#FCA5A5",
        dark: "#DC2626",
    },
    success: {
        DEFAULT: "#22C55E",
        light: "#86EFAC",
        dark: "#16A34A",
    },
} as const;

export const fonts = {
    display: "'Playfair Display', serif",
    body: "'Plus Jakarta Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    arabic: "'Cairo', sans-serif",
} as const;

export const radii = {
    sm: "6px",
    md: "12px",
    lg: "20px",
    xl: "32px",
} as const;

export const shadows = {
    goldSm: "0 2px 8px rgba(212, 160, 23, 0.08)",
    goldMd: "0 4px 16px rgba(212, 160, 23, 0.12), 0 2px 4px rgba(0, 0, 0, 0.2)",
    goldLg: "0 8px 32px rgba(212, 160, 23, 0.15), 0 4px 8px rgba(0, 0, 0, 0.3)",
    goldXl: "0 16px 48px rgba(212, 160, 23, 0.2), 0 8px 16px rgba(0, 0, 0, 0.35)",
    card: "0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(212, 160, 23, 0.08)",
    cardHover: "0 8px 40px rgba(0, 0, 0, 0.4), 0 2px 0 rgba(212, 160, 23, 0.15)",
} as const;

export const transitions = {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// Framer Motion animation presets
export const motionPresets = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
    },
    fadeUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    },
    fadeDown: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    },
    slideLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
    },
    slideRight: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4, ease: "easeOut" },
    },
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    },
    staggerItem: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
    },
} as const;

// Breakpoints (matches Tailwind defaults)
export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
} as const;

// Z-index scale
export const zIndex = {
    dropdown: 50,
    sticky: 100,
    overlay: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
} as const;
