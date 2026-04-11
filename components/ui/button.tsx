"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = {
    primary:
        "bg-gradient-to-r from-primary-dark via-primary to-primary-light text-navy-900 font-semibold shadow-gold-md hover:shadow-gold-lg",
    secondary:
        "bg-slate-100 dark:bg-navy-600 text-[#0D1B2A] dark:text-white border border-slate-300 dark:border-navy-400 hover:bg-slate-200 dark:hover:bg-navy-500 hover:border-primary/30",
    outline:
        "bg-transparent text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary",
    ghost:
        "bg-transparent text-slate-600 dark:text-navy-200 hover:bg-slate-100 dark:hover:bg-navy-700 hover:text-[#0D1B2A] dark:hover:text-white",
    danger:
        "bg-danger text-white hover:bg-danger-dark shadow-md",
    accent:
        "bg-accent text-navy-900 font-semibold hover:bg-accent-light",
};

const buttonSizes = {
    sm: "h-8 px-3 text-xs rounded-sm gap-1.5",
    md: "h-10 px-5 text-sm rounded-md gap-2",
    lg: "h-12 px-7 text-base rounded-md gap-2.5",
    xl: "h-14 px-9 text-lg rounded-lg gap-3",
    icon: "h-10 w-10 rounded-md flex items-center justify-center p-0",
};

export interface ButtonProps
    extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-navy-900 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
                    buttonVariants[variant],
                    buttonSizes[size],
                    className
                )}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && (
                    <span className="shrink-0">{rightIcon}</span>
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
