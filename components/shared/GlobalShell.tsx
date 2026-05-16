"use client";

import React from "react";
import { ToastProvider } from "@/components/ui/Toast";
import { SearchModal, useSearchModal } from "@/components/ui/SearchModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import ChatBot from "@/components/shared/ChatBot";

export function GlobalShell({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSearchModal();

    return (
        <ToastProvider>
            {children}
            <SearchModal open={open} onClose={() => setOpen(false)} />
            <ScrollToTop />
            <ChatBot />
        </ToastProvider>
    );
}
