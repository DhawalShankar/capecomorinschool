// app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/auth";
import InstallAppButton from "@/components/admin/InstallAppButton";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-30 h-30 rounded-full overflow-hidden bg-transparent shadow-sm">
            <Image src="/logo.png" alt="Cape Comorin School" width={100} height={100} className="w-full h-full object-contain" priority />
          </div>
        </div>
        <div className="text-center mb-8">
          <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-2">Admin Panel</div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16233F]">
            Cape Comorin School
          </h1>
        </div>
        <div className="bg-white text-black border border-[#E5DFD0] rounded p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#5B5F66] mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@capecomorinschool.com"
                className="w-full border border-[#E5DFD0] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#5B5F66] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#E5DFD0] rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A227]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm mt-2"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          </form>
        </div>

        <div className="mt-4">
          <InstallAppButton variant="dropdown" />
        </div>

        <p className="text-center text-xs text-[#8A8F97] mt-6">
          Cape Comorin School — Internal use only
        </p>
      </div>
    </div>
  );
}