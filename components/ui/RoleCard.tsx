"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    isSelected: boolean;
    onClick: () => void;
}

export function RoleCard({ icon, title, subtitle, description, isSelected, onClick }: RoleCardProps) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer outline-none group",
                isSelected
                    ? "border-primary bg-primary/8 shadow-[0_0_24px_rgba(212,160,23,0.2)]"
                    : "border-slate-300 dark:border-navy-600 bg-slate-50 dark:bg-navy-900/60 hover:border-slate-400 dark:hover:border-navy-400"
            )}
        >
            {/* Gold glow top bar */}
            {isSelected && (
                <motion.div
                    layoutId="roleGlow"
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
            )}

            {/* Checkmark */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
            >
                <CheckCircle className="w-4 h-4 text-navy-950" />
            </motion.div>

            {/* Icon */}
            <div className={cn(
                "text-4xl mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                isSelected ? "bg-primary/15 border border-primary/30" : "bg-slate-100 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 group-hover:border-slate-400 dark:group-hover:border-navy-500"
            )}>
                {icon}
            </div>

            {/* Text */}
            <h3 className={cn("font-display text-xl mb-1 transition-colors", isSelected ? "text-primary" : "text-[#0D1B2A] dark:text-white")}>{title}</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-navy-400 mb-2 uppercase tracking-wider">{subtitle}</p>
            <p className="text-sm text-slate-600 dark:text-navy-300 leading-relaxed">{description}</p>
        </motion.button>
    );
}
