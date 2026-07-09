// components/admin/AdminTopbar.tsx
"use client";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AdminTopbar() {
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
      <header className="h-16 bg-white border-b border-[#E5DFD0] flex items-center justify-between px-6">
        <div className="text-[#16233F] font-[family-name:var(--font-display)] font-semibold">
          Welcome back
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-sm text-[#5B5F66] hover:text-[#16233F] font-medium"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="text-sm text-[#8B2E3F] hover:text-[#732634] font-medium disabled:opacity-60"
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