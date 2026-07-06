// app/(public)/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Cape Comorin School | Where the Dreams are Nurtured",
  description: "Cape Comorin School, Kanpur — Playgroup to Class 8. Est. 2001.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-[#FAF6EE] text-[#22262B]`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}