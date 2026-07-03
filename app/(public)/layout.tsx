// app/(public)/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Cape Comorin School | Where the Dreams are Nurtured",
  description: "Cape Comorin School, Kanpur — Playgroup to Class 8. Est. 2001.",
};

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/faculty", label: "Faculty" },
  { href: "/gallery", label: "Gallery" },
  { href: "/calendar", label: "Calendar" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-[#FAF6EE] text-[#22262B]`}>
      <header className="sticky top-0 z-50 bg-[#16233F] text-[#FAF6EE] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Cape Comorin School" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <div className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide">
                Cape Comorin School
              </div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227]">
                Est. 2001
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[#C9A227] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/fees"
            className="bg-[#8B2E3F] hover:bg-[#732634] transition-colors px-4 py-2 rounded text-sm font-medium"
          >
            Pay Fees
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-[#16233F] text-[#FAF6EE] mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
              Cape Comorin School
            </div>
            <p className="text-sm text-[#C9C4B8] leading-relaxed">
              Where the Dreams are Nurtured. Playgroup to Class 8, Kanpur.
            </p>
          </div>
          <div className="text-sm space-y-2 text-[#C9C4B8]">
            <div className="text-[#C9A227] uppercase tracking-wide text-xs mb-1">Contact</div>
            <p>HIG 295, Ratan Lal Nagar, Kanpur</p>
            <p>+91 98394 74191</p>
            <p>ccs.nurturedreams@gmail.com</p>
          </div>
          <div className="text-sm space-y-2 text-[#C9C4B8]">
            <div className="text-[#C9A227] uppercase tracking-wide text-xs mb-1">Quick Links</div>
            <div className="flex flex-col gap-1">
              <Link href="/admissions" className="hover:text-[#C9A227]">Admissions</Link>
              <Link href="/notices" className="hover:text-[#C9A227]">Notice Board</Link>
              <Link href="/calendar" className="hover:text-[#C9A227]">Academic Calendar</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2A3A5C] text-center text-xs text-[#8A93A8] py-4">
          © {new Date().getFullYear()} Cape Comorin School. All rights reserved.
        </div>
      </footer>
    </div>
  );
}