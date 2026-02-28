"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
    variant?: "default" | "filled";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error,
            hint,
            options,
            placeholder = "Select an option",
            variant = "default",
            id,
            ...props
        },
        ref
    ) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

        const variants = {
            default:
                "bg-navy-700/50 border border-navy-500/50 focus:border-primary focus:ring-1 focus:ring-primary/30",
            filled:
                "bg-navy-600 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/30",
        };

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium font-body text-navy-200"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            "w-full h-10 px-3 pr-10 rounded-md text-sm font-body text-white appearance-none transition-all duration-200 outline-none cursor-pointer",
                            variants[variant],
                            error &&
                            "border-danger focus:border-danger focus:ring-danger/30",
                            className
                        )}
                        {...props}
                    >
                        <option value="" disabled className="text-navy-400 bg-navy-800">
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className="bg-navy-800 text-white"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300 pointer-events-none" />
                </div>
                {error && <p className="text-xs text-danger font-body">{error}</p>}
                {hint && !error && (
                    <p className="text-xs text-navy-300 font-body">{hint}</p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";
