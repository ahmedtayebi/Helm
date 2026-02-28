import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Cairo,
} from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "HELM Academy — Engineer Your Future in Energy",
    template: "%s | HELM Academy",
  },
  description:
    "HELM Academy is a premium educational platform for petroleum engineering professionals. Master Drilling, Reservoir Engineering, Production, HSE, LNG, and more with industry-leading courses.",
  keywords: [
    "petroleum engineering",
    "oil and gas training",
    "drilling engineering",
    "reservoir engineering",
    "HSE training",
    "LNG courses",
    "petroleum economics",
    "HELM Academy",
    "energy education",
    "Algeria",
    "MENA",
  ],
  authors: [{ name: "HELM Academy" }],
  openGraph: {
    title: "HELM Academy — Engineer Your Future in Energy",
    description:
      "Premium petroleum engineering education for students and professionals across Algeria and MENA.",
    type: "website",
    locale: "en_US",
    siteName: "HELM Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "HELM Academy — Engineer Your Future in Energy",
    description:
      "Premium petroleum engineering education for students and professionals across Algeria and MENA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} ${cairo.variable}`}
    >
      <body className="min-h-screen bg-navy-900 font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
