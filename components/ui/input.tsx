"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: "default" | "filled" | "ghost";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = "text",
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            variant = "default",
            id,
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = useState(false);
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        const variants = {
            default:
                "bg-navy-700/50 border border-navy-500/50 focus:border-primary focus:ring-1 focus:ring-primary/30",
            filled:
                "bg-navy-600 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/30",
            ghost:
                "bg-transparent border border-transparent hover:bg-navy-700/30 focus:bg-navy-700/50 focus:border-primary/30",
        };

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "block text-sm font-medium font-body transition-colors duration-200",
                            focused ? "text-primary" : "text-navy-200",
                            error && "text-danger"
                        )}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        className={cn(
                            "w-full h-10 px-3 rounded-md text-sm font-body text-white placeholder:text-navy-300 transition-all duration-200 outline-none",
                            variants[variant],
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            error &&
                            "border-danger focus:border-danger focus:ring-danger/30",
                            className
                        )}
                        onFocus={(e) => {
                            setFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setFocused(false);
                            props.onBlur?.(e);
                        }}
                        {...props}
                    />
                    {rightIcon && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300">
                            {rightIcon}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-danger font-body">{error}</p>
                )}
                {hint && !error && (
                    <p className="text-xs text-navy-300 font-body">{hint}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

// ── Textarea ──
export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium font-body text-navy-200"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        "w-full min-h-[100px] px-3 py-2 rounded-md text-sm font-body text-white bg-navy-700/50 border border-navy-500/50 placeholder:text-navy-300 transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-y",
                        error && "border-danger focus:border-danger focus:ring-danger/30",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-danger font-body">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
