"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, label, error, hint, id, ...props }, ref) => {
        const [show, setShow] = useState(false);
        const inputId = id || "password";

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label htmlFor={inputId} className={cn("block text-sm font-medium text-slate-600 dark:text-navy-200", error && "text-red-400")}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        id={inputId}
                        type={show ? "text" : "password"}
                        className={cn(
                            "w-full h-12 px-4 pr-12 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-400 outline-none transition-all duration-200",
                            "bg-white dark:bg-navy-800/80 border border-slate-300 dark:border-navy-600",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            className
                        )}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShow(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-400 hover:text-primary transition-colors p-1 rounded"
                        aria-label={show ? "Hide password" : "Show password"}
                    >
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {error && (
                    <p className="text-xs text-red-400 flex items-center gap-1 animate-[shake_0.3s_ease]">
                        <span>⚠</span> {error}
                    </p>
                )}
                {hint && !error && <p className="text-xs text-slate-400 dark:text-navy-400">{hint}</p>}
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";


interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({ className, label, error, hint, icon, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label htmlFor={inputId} className={cn("block text-sm font-medium text-slate-600 dark:text-navy-200", error && "text-red-400")}>
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-400 pointer-events-none">
                            {icon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            "w-full h-12 px-4 rounded-xl text-sm text-[#0D1B2A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-400 outline-none transition-all duration-200",
                            "bg-white dark:bg-navy-800/80 border border-slate-300 dark:border-navy-600",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            icon && "pl-10",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                        <span>⚠</span> {error}
                    </p>
                )}
                {hint && !error && <p className="text-xs text-slate-400 dark:text-navy-400">{hint}</p>}
            </div>
        );
    }
);
AuthInput.displayName = "AuthInput";


interface AuthSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export function AuthSelect({ label, error, options, placeholder, id, className, ...props }: AuthSelectProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label htmlFor={inputId} className={cn("block text-sm font-medium text-slate-600 dark:text-navy-200", error && "text-red-400")}>
                    {label}
                </label>
            )}
            <select
                id={inputId}
                className={cn(
                    "w-full h-12 px-4 rounded-xl text-sm text-[#0D1B2A] dark:text-white outline-none transition-all duration-200",
                    "bg-white dark:bg-navy-800/80 border border-slate-300 dark:border-navy-600",
                    "focus:border-primary focus:ring-2 focus:ring-primary/20",
                    error && "border-red-500",
                    className
                )}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {error && <p className="text-xs text-red-400">⚠ {error}</p>}
        </div>
    );
}
