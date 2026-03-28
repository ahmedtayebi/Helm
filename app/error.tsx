"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-2xl bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h1 className="font-display text-3xl text-white mb-3">Something went wrong</h1>
                    <p className="text-navy-400 text-sm mb-2">
                        An unexpected error occurred. Our team has been notified automatically.
                    </p>
                    {error.digest && (
                        <p className="text-[10px] text-navy-600 font-mono mb-6">Error ID: {error.digest}</p>
                    )}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} className="gap-2"><RefreshCw className="w-4 h-4" />Try Again</Button>
                    <Link href="/"><Button variant="outline" className="gap-2"><Home className="w-4 h-4" />Go Home</Button></Link>
                </motion.div>
            </div>
        </div>
    );
}
