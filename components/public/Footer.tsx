// components/public/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
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
  );
}