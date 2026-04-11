import React from "react";
import { cn } from "@/lib/utils";

/* ─── Skeleton Line ────────────────── */
export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse rounded-lg bg-slate-200 dark:bg-navy-800/70", className)} />
    );
}

/* ─── Course Card Skeleton ─────────── */
export function CourseCardSkeleton() {
    return (
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl overflow-hidden">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="p-5 space-y-3">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center gap-2 pt-1">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="h-3 w-28" />
                </div>
                <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

/* ─── List Item Skeleton ─────────── */
export function ListItemSkeleton() {
    return (
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl p-4 flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
    );
}

/* ─── Stat Card Skeleton ─────────── */
export function StatCardSkeleton() {
    return (
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl p-4 space-y-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3 w-28" />
        </div>
    );
}

/* ─── Page Loading Grid ───────────── */
export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => <CourseCardSkeleton key={i} />)}
        </div>
    );
}
