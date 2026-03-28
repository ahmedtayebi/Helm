import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community",
    description: "Join HELM Academy's petroleum engineering community — live webinars, events, success stories, and the upcoming engineers forum for the MENA region.",
    keywords: ["petroleum engineering community", "oil gas webinars", "engineering events Algeria", "HELM community"],
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
