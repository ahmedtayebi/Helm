import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
    default:
        "bg-primary/15 text-primary border border-primary/20",
    secondary:
        "bg-navy-500/50 text-navy-100 border border-navy-400/30",
    success:
        "bg-success/15 text-success border border-success/20",
    warning:
        "bg-primary-light/15 text-primary-light border border-primary-light/20",
    danger:
        "bg-danger/15 text-danger border border-danger/20",
    accent:
        "bg-accent/15 text-accent border border-accent/20",
    outline:
        "bg-transparent text-navy-200 border border-navy-400",
};

const badgeSizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: keyof typeof badgeVariants;
    size?: keyof typeof badgeSizes;
    dot?: boolean;
}

export function Badge({
    className,
    variant = "default",
    size = "md",
    dot = false,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 font-body font-medium rounded-full whitespace-nowrap transition-colors",
                badgeVariants[variant],
                badgeSizes[size],
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className={cn("h-1.5 w-1.5 rounded-full", {
                        "bg-primary": variant === "default" || variant === "warning",
                        "bg-success": variant === "success",
                        "bg-danger": variant === "danger",
                        "bg-accent": variant === "accent",
                        "bg-navy-300": variant === "secondary" || variant === "outline",
                    })}
                />
            )}
            {children}
        </span>
    );
}
