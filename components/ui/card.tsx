"use client";

import React from "react";
import Image from "next/image";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Card Root ──
export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    variant?: "default" | "glass" | "outlined" | "elevated";
    hover?: boolean;
    glow?: boolean;
    children?: React.ReactNode;
}

export function Card({
    className,
    variant = "default",
    hover = true,
    glow = false,
    children,
    ...props
}: CardProps) {
    const variants = {
        default: "bg-white dark:bg-navy-600 border border-slate-200 dark:border-navy-500/50",
        glass: "glass",
        outlined: "bg-transparent border border-slate-200 dark:border-navy-400/30",
        elevated: "bg-white dark:bg-navy-600 shadow-card",
    };

    return (
        <motion.div
            className={cn(
                "rounded-md overflow-hidden transition-all duration-300",
                variants[variant],
                hover && "hover-lift hover-gold cursor-pointer",
                glow && "animate-gold-glow",
                className
            )}
            whileHover={hover ? { y: -4 } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ── Card Header ──
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
    return (
        <div
            className={cn("px-5 pt-5 pb-3 space-y-1.5", className)}
            {...props}
        />
    );
}

// ── Card Title ──
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn(
                "font-display text-lg font-semibold text-[#0D1B2A] dark:text-white leading-tight",
                className
            )}
            {...props}
        />
    );
}

// ── Card Description ──
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
    return (
        <p
            className={cn("text-sm text-slate-500 dark:text-navy-200 font-body line-clamp-2", className)}
            {...props}
        />
    );
}

// ── Card Content ──
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, ...props }: CardContentProps) {
    return <div className={cn("px-5 py-3", className)} {...props} />;
}

// ── Card Footer ──
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
    return (
        <div
            className={cn(
                "px-5 pb-5 pt-3 flex items-center border-t border-slate-200 dark:border-navy-500/30",
                className
            )}
            {...props}
        />
    );
}

// ── Card Image ──
export interface CardImageProps {
    src: string;
    alt?: string;
    overlay?: boolean;
    className?: string;
    width?: number;
    height?: number;
}

export function CardImage({
    className,
    overlay = true,
    alt = "",
    src,
    width = 600,
    height = 300,
}: CardImageProps) {
    return (
        <div className="relative overflow-hidden">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(
                    "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105",
                    className
                )}
            />
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 dark:from-navy-900/60 via-transparent to-transparent" />
            )}
        </div>
    );
}
