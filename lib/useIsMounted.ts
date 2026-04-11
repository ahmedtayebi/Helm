"use client";

import { useState, useEffect } from "react";

/**
 * Returns `true` only after the component has mounted on the client.
 * Use this to gate any theme-aware rendering so the SSR pass serves
 * the default dark theme and client hydration matches exactly.
 */
export function useIsMounted(): boolean {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}
