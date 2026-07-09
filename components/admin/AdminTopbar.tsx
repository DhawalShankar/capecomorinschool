// components/admin/AdminTopbar.tsx
"use client";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

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
      <header className="h-16 bg-white border-b border-[#E5DFD0] flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="md:hidden text-[#16233F]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
          <div className="text-[#16233F] font-[family-name:var(--font-display)] font-semibold text-sm sm:text-base">
            Welcome back
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
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