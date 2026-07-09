// app/admin/fees/page.tsx
"use client";
import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/api";

type FeeTransaction = {
  id: number;
  student_digital_id: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function AdminFees() {
  const [txns, setTxns] = useState<FeeTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setForbidden(false);
      setLoadError(null);
      try {
        const res = await authedFetch(`${API}/api/fees`);
        if (res.status === 403) {
          setForbidden(true);
          return;
        }
        if (!res.ok) {
          setLoadError("Couldn't load fee transactions. Try refreshing.");
          return;
        }
        const data = await res.json();
        setTxns(Array.isArray(data) ? data : []);
      } catch {
        setLoadError("Couldn't reach the server. Check your connection.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API]);

  if (forbidden) {
    return (
      <div className="max-w-4xl">
        <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-2">
          Fee Transactions
        </h1>
        <p className="text-sm text-[#8A8F97] bg-[#F3E9E9] text-[#8B2E3F] rounded px-4 py-3 mt-6">
          You don&apos;t have access to this section.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-2">
        Fee Transactions
      </h1>
      <p className="text-sm text-[#8A8F97] mb-8">
        Note: since fees now go through Razorpay&apos;s hosted payment page directly,
        this log stays empty unless a webhook is set up to record payments here.
      </p>

      {loading ? (
        <p className="text-sm text-[#8A8F97]">Loading...</p>
      ) : loadError ? (
        <p className="text-sm text-[#8B2E3F] bg-[#F3E9E9] rounded px-4 py-3">{loadError}</p>
      ) : txns.length === 0 ? (
        <p className="text-sm text-[#8A8F97]">No recorded transactions yet.</p>
      ) : (
        <div className="divide-y divide-[#E5DFD0] border-t border-b border-[#E5DFD0]">
          {txns.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <div className="font-medium text-[#16233F]">{t.student_digital_id}</div>
                <div className="text-xs text-[#5B5F66]">{new Date(t.created_at).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-[#16233F]">₹{t.amount}</div>
                <div className="text-xs text-[#5B5F66]">{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}