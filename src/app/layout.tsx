import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VisitorTracker from "@/components/VisitorTracker";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIFA 2026 Fan Hub — Schedules, Fan Art & More",
  description:
    "The ultimate fan destination for the 2026 FIFA World Cup. All 104 match schedules, crazy fan edits, and pure football hype.",
  keywords: ["FIFA 2026", "World Cup 2026", "schedule", "football", "soccer"],
  openGraph: {
    title: "FIFA 2026 Fan Hub",
    description: "All 104 matches. Pure football energy.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className="scanlines"
        style={{ background: "#050510", color: "#ffffff", fontFamily: "var(--font-inter)" }}
      >
        <VisitorTracker />
        <Header />
        <main style={{ paddingTop: "66px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
