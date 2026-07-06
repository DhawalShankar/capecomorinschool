// components/public/Navbar.tsx
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
  return (
    <header className="sticky top-0 z-50 bg-[#16233F] text-[#FAF6EE] shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
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
  );
}