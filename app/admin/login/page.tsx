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
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col md:flex-row">
      {/* Identity panel */}
      <div className="relative md:w-[42%] bg-[#16233F] px-8 py-12 md:py-0 flex flex-col items-center md:items-start justify-center overflow-hidden">
        {/* Three seas — signature motif */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-40 md:h-56 opacity-90"
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 120 Q 50 90 100 120 T 200 120 T 300 120 T 400 120 V160 H0 Z"
            fill="#C9A227"
            opacity="0.18"
          />
          <path
            d="M0 135 Q 50 105 100 135 T 200 135 T 300 135 T 400 135 V160 H0 Z"
            fill="#8B2E3F"
            opacity="0.28"
          />
          <path
            d="M0 148 Q 50 122 100 148 T 200 148 T 300 148 T 400 148 V160 H0 Z"
            fill="#FAF6EE"
            opacity="0.12"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center md:items-start max-w-xs mx-auto md:mx-0 md:ml-16">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-transparent shadow-sm mb-6">
            <Image
              src="/logo.png"
              alt="Cape Comorin School"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="text-[#C9A227] uppercase tracking-[0.25em] text-[11px] mb-3 font-medium">
            Staff Admin Panel
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-[#FAF6EE] leading-tight text-center md:text-left">
            Cape Comorin
            <br />
            School
          </h1>

          <p className="hidden md:block text-[#8A93A8] text-sm mt-5 leading-relaxed">
            Where the Dreams are Nurtured — internal tools for teachers and staff.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#16233F] mb-1">
              Sign in
            </h2>
            <p className="text-sm text-[#8A8F97]">
              Use your staff email and password to continue.
            </p>
          </div>

          <div className="bg-white border border-[#E5DFD0] rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#5B5F66] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@capecomorinschool.com"
                  className="w-full border border-[#E5DFD0] rounded px-4 py-2.5 text-sm text-[#16233F] placeholder:text-[#B8B2A0] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5B5F66] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#E5DFD0] rounded px-4 py-2.5 text-sm text-[#16233F] placeholder:text-[#B8B2A0] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] transition-colors"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-[#8B2E3F]/6 border border-[#8B2E3F]/20 rounded px-3 py-2.5">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8B2E3F"
                    strokeWidth="2"
                    className="shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm text-[#8B2E3F]">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white px-6 py-2.5 rounded font-medium text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Signing in
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
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
    </div>
  );
}