// components/public/Footer.tsx
import Link from "next/link";

// lucide-react no longer includes brand/logo icons (Facebook, Instagram,
// LinkedIn, etc. were deprecated due to trademark policy) — so these stay
// as small inline SVGs instead.
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.5 3.3-3.5.95 0 1.95.17 1.95.17v2.1h-1.08c-1.07 0-1.4.67-1.4 1.36v1.62h2.38l-.38 2.9h-2v7A10 10 0 0022 12z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 1016.8 13 4.8 4.8 0 0012 8.2zM18.4 6.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 112.5 6 2.5 2.5 0 014.98 3.5zM3 8.98h3.98V21H3zM9.5 8.98H13v1.64h.06a4.06 4.06 0 013.65-2c3.9 0 4.62 2.57 4.62 5.91V21h-3.98v-5.07c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68V21H9.5z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.12h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/cape-comorin-school/",
  facebook: "https://www.facebook.com/capecomorinschool",
  instagram: "https://www.instagram.com/ccs.nurturedreams/",
  whatsapp: "https://wa.me/919839474191",
};

export default function Footer() {
  return (
    <footer className="bg-[#16233F] text-[#FAF6EE] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo.png" alt="Cape Comorin School" className="h-10 w-10 object-contain" />
            <div className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Cape Comorin School
            </div>
          </div>
          <p className="text-sm text-[#C9C4B8] leading-relaxed">
            Where the Dreams are Nurtured. Playgroup to Class 8, Kanpur.
          </p>

          <div className="flex items-center gap-3 mt-5">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Cape Comorin School on Facebook" className="text-[#C9C4B8] hover:text-[#C9A227] transition-colors">
              <FacebookIcon size={18} />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Cape Comorin School on Instagram" className="text-[#C9C4B8] hover:text-[#C9A227] transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Cape Comorin School on LinkedIn" className="text-[#C9C4B8] hover:text-[#C9A227] transition-colors">
              <LinkedinIcon size={18} />
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Cape Comorin School on WhatsApp" className="text-[#C9C4B8] hover:text-[#C9A227] transition-colors">
              <WhatsAppIcon size={18} />
            </a>
          </div>
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