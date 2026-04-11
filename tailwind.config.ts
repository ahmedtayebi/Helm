import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4A017",
          light: "#F5C518",
          dark: "#A07810",
          50: "#FDF8E8",
          100: "#FAEFC5",
          200: "#F5DF8A",
          300: "#F0CF50",
          400: "#F5C518",
          500: "#D4A017",
          600: "#A07810",
          700: "#7A5C0C",
          800: "#543F08",
          900: "#2E2204",
        },
        navy: {
          DEFAULT: "#0A1628",
          50: "#E8EDF5",
          100: "#C5D0E5",
          200: "#A8B8D0",
          300: "#8A9BBC",
          400: "#6B7FA3",
          500: "#4A6080",
          600: "#2D4A77",
          700: "#1A2E4A",
          800: "#132238",
          900: "#0A1628",
          950: "#060E1A",
        },
        accent: {
          DEFAULT: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#14B8A6",
        },
        surface: {
          DEFAULT: "#1A2E4A",
          light: "#243B5C",
          dark: "#132238",
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
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "32px",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(212, 160, 23, 0.08)",
        "gold-md":
          "0 4px 16px rgba(212, 160, 23, 0.12), 0 2px 4px rgba(0, 0, 0, 0.2)",
        "gold-lg":
          "0 8px 32px rgba(212, 160, 23, 0.15), 0 4px 8px rgba(0, 0, 0, 0.3)",
        "gold-xl":
          "0 16px 48px rgba(212, 160, 23, 0.2), 0 8px 16px rgba(0, 0, 0, 0.35)",
        "gold-glow": "0 0 24px rgba(212, 160, 23, 0.25)",
        "inner-gold": "inset 0 1px 0 rgba(212, 160, 23, 0.1)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(212, 160, 23, 0.08)",
        "card-hover":
          "0 8px 40px rgba(0, 0, 0, 0.4), 0 2px 0 rgba(212, 160, 23, 0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold":
          "linear-gradient(135deg, #D4A017 0%, #F5C518 50%, #D4A017 100%)",
        "gradient-navy":
          "linear-gradient(180deg, #0A1628 0%, #0F2040 50%, #1A2E4A 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at 20% 50%, rgba(212, 160, 23, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(45, 212, 191, 0.05) 0%, transparent 50%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(26, 46, 74, 0.6) 0%, rgba(19, 34, 56, 0.8) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "gold-glow": "goldGlow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        goldGlow: {
          "0%": { boxShadow: "0 0 12px rgba(212, 160, 23, 0.15)" },
          "100%": { boxShadow: "0 0 24px rgba(212, 160, 23, 0.3)" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
