"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

/* ─── Types ─────────────────────────────── */
type ToastType = "success" | "error" | "warning" | "info";
interface Toast { id: string; message: string; type: ToastType; }
interface ToastCtx { toast: (message: string, type?: ToastType) => void; }

const ICONS = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
const STYLES: Record<ToastType, string> = {
    success: "border-teal-500/40 bg-teal-500/10 text-teal-400",
    error:   "border-red-500/40   bg-red-500/10   text-red-400",
    warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    info:    "border-primary/40   bg-primary/10   text-primary",
};

/* ─── Context ────────────────────────────── */
const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

/* ─── Provider ───────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
                <AnimatePresence>
                    {toasts.map(t => {
                        const Icon = ICONS[t.type];
                        return (
                            <motion.div key={t.id}
                                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl bg-navy-900/90 shadow-xl ${STYLES[t.type]}`}>
                                <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <p className="flex-1 text-sm text-white leading-snug">{t.message}</p>
                                <button onClick={() => dismiss(t.id)} className="text-navy-500 hover:text-white transition-colors flex-shrink-0">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
