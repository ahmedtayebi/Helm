import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About HELM Academy",
    description: "Learn about HELM Academy's mission to power the next generation of petroleum engineers across Algeria and the MENA region — our story, values, and advisory board.",
    keywords: ["about HELM Academy", "petroleum engineering education Algeria", "oil gas training MENA", "energy education platform"],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
