// components/public/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#16233F] text-[#FAF6EE] shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Cape Comorin School" className="h-15 w-15 object-contain" />
          <div className="leading-tight">
            <div className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-wide">
              Cape Comorin School
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#C9A227]">
              Est. 2001
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#C9A227] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/fees"
            className="hidden sm:inline-block bg-[#8B2E3F] hover:bg-[#732634] transition-colors px-4 py-2 rounded text-sm font-medium"
          >
            Pay Fees
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 pb-4 gap-1 border-t border-white/10 pt-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm hover:text-[#C9A227] transition-colors border-b border-white/5 last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/fees"
            onClick={() => setOpen(false)}
            className="mt-3 bg-[#8B2E3F] hover:bg-[#732634] transition-colors px-4 py-2.5 rounded text-sm font-medium text-center"
          >
            Pay Fees
          </Link>
        </nav>
      </div>
    </header>
  );
}