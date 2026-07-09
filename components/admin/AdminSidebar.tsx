// components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authedFetch } from "@/lib/api";
import InstallAppButton from "./InstallAppButton";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard", superAdminOnly: false },
  { href: "/teachers", label: "Teachers", icon: "teacher", superAdminOnly: true },
  { href: "/students", label: "Students", icon: "student", superAdminOnly: false },
  { href: "/registers", label: "Registers", icon: "register", superAdminOnly: false },
  { href: "/notices", label: "Notices", icon: "notice", superAdminOnly: false },
  { href: "/calendar", label: "Calendar", icon: "calendar", superAdminOnly: false },
  { href: "/fees", label: "Fees", icon: "fees", superAdminOnly: true },
] as const;

const icons: Record<string, ReactNode> = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="12" width="8" height="9" rx="1.5" /><rect x="3" y="14" width="8" height="7" rx="1.5" />
    </svg>
  ),
  teacher: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" /><path d="M5 20c1.5-4 4-5.5 7-5.5s5.5 1.5 7 5.5" strokeLinecap="round" />
    </svg>
  ),
  student: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 4 2 9l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" strokeLinecap="round" />
    </svg>
  ),
  register: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6" strokeLinecap="round" />
    </svg>
  ),
  notice: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  ),
  fees: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9.5c0-1.5 1.3-2 3-2s3 .8 3 2-1.3 1.8-3 2-3 .8-3 2 1.3 2 3 2 3-.5 3-2" strokeLinecap="round" />
    </svg>
  ),
};

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;
    authedFetch(`${API}/api/auth/me`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setRole(data?.role ?? null))
      .catch(() => setRole(null));
  }, []);

  const visibleNav = nav.filter((item) => !item.superAdminOnly || role === "super_admin");

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 md:hidden" />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#16233F] text-[#FAF6EE] flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex md:flex-col
        `}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#2A3A5C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-transparent shrink-0">
              <Image src="/logo.png" alt="Cape Comorin School" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-semibold text-sm">
              Admin Panel
            </span>
          </div>
          <button onClick={onClose} className="md:hidden text-[#C9C4B8] hover:text-[#FAF6EE]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {visibleNav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                  active
                    ? "bg-[#C9A227] text-[#16233F] font-medium"
                    : "text-[#C9C4B8] hover:bg-[#1F3055] hover:text-[#FAF6EE]"
                }`}
              >
                {icons[item.icon]}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          <InstallAppButton />
        </div>

        <div className="px-6 py-4 border-t border-[#2A3A5C] text-xs text-[#8A93A8]">
          Cape Comorin School
        </div>
      </aside>
    </>
  );
}