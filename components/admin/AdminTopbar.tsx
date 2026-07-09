// components/admin/AdminTopbar.tsx
"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { authedFetch } from "@/lib/api";
import ChangePasswordModal from "./ChangePasswordModal";

type AdminProfile = {
  email: string;
  role: "super_admin" | string;
  teacher_id?: string | null;
  first_name?: string | null;
};

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr."];

/** Strips a leading title ("Mrs. Jane Smith" -> "Jane") and returns just the first name. */
function firstNameFromTeacherName(fullName: string): string {
  const withoutTitle = TITLES.reduce(
    (acc, t) => (acc.startsWith(`${t} `) ? acc.slice(t.length + 1) : acc),
    fullName
  );
  return withoutTitle.split(" ")[0] ?? withoutTitle;
}

/**
 * Fallback only: derives a readable first name from the email's local part
 * (e.g. "jane.smith@school.com" -> "Jane"). Used if the teacher record can't
 * be loaded for some reason.
 */
function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._-]/)[0] ?? local;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [teacherFirstName, setTeacherFirstName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    async function loadProfile() {
      try {
        const res = await authedFetch(`${API}/api/auth/me`);
        if (!res.ok) return;
        const data: AdminProfile = await res.json();
        if (cancelled) return;
        setProfile(data);

        // Super admins have no teacher_id, so there's nothing to look up.
        if (data.role !== "super_admin" && data.teacher_id) {
          loadTeacherName(data.teacher_id);
        }
      } catch {
        // Silently fall back to the generic greeting below.
      }
    }

    async function loadTeacherName(teacherId: string) {
      try {
        const res = await authedFetch(`${API}/api/teachers/${teacherId}`);
        if (!res.ok) return;
        const teacher = await res.json();
        if (!cancelled && teacher?.name) {
          setTeacherFirstName(firstNameFromTeacherName(teacher.name));
        }
      } catch {
        // Falls back to email-derived name below.
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const greeting = profile
    ? profile.role === "super_admin"
      ? "Welcome CCS"
      : `Welcome ${teacherFirstName ?? profile.first_name ?? nameFromEmail(profile.email)}`
    : "Welcome back";

  async function handleLogout() {
    setSigningOut(true);
    try {
      await signOut(auth);
      router.push("/login");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <>
      <header className="h-16 bg-white border-b border-[#E5DFD0] flex items-center justify-between px-4 sm:px-6 overflow-hidden">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenuClick} className="md:hidden text-[#16233F] shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="text-[#16233F] font-[family-name:var(--font-display)] font-semibold text-sm sm:text-base truncate">
            {greeting}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-xs sm:text-sm text-[#5B5F66] hover:text-[#16233F] font-medium whitespace-nowrap"
          >
            <span className="hidden sm:inline">Change Password</span>
            <span className="sm:hidden">Password</span>
          </button>
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="text-xs sm:text-sm text-[#8B2E3F] hover:text-[#732634] font-medium disabled:opacity-60 whitespace-nowrap"
          >
            {signingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </header>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </>
  );
}