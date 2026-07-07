// components/admin/AdminTopbar.tsx
"use client";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    try {
      await signOut(auth);
      router.push("/admin/login");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="h-16 bg-white border-b border-[#E5DFD0] flex items-center justify-between px-6">
      <div className="text-[#16233F] font-[family-name:var(--font-display)] font-semibold">
        Welcome back
      </div>
      <button
        onClick={handleLogout}
        disabled={signingOut}
        className="text-sm text-[#8B2E3F] hover:text-[#732634] font-medium disabled:opacity-60"
      >
        {signingOut ? "Signing out…" : "Sign Out"}
      </button>
    </header>
  );
}