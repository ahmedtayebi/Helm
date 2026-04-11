import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client.
 * Use this inside Server Components, Route Handlers, and Server Actions.
 * Reads/writes the auth cookie automatically via Next.js `cookies()`.
 * Uses the anon key — subject to RLS policies.
 */
export function createClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // setAll is called from a Server Component — safe to ignore.
                        // Middleware handles session refresh instead.
                    }
                },
            },
        }
    );
}
