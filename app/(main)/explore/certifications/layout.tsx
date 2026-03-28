import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certifications",
    description: "Get industry-recognized petroleum engineering certificates from HELM Academy. Verifiable via QR code, trusted by Sonatrach, TotalEnergies, SLB, and 50+ energy companies across MENA.",
    keywords: ["petroleum engineering certificate", "oil gas certification Algeria", "drilling certificate", "HELM Academy certificate", "energy qualification MENA"],
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
