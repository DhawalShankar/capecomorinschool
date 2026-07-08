// app/(admin)/fees/page.tsx
"use client";
import { useEffect, useState } from "react";

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
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${API}/api/fees`, { cache: "no-store" })
      .then((res) => res.json())
      .then(setTxns)
      .finally(() => setLoading(false));
  }, [API]);

  return (
    <div className="max-w-4xl">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-2">
        Fee Transactions
      </h1>
      <p className="text-sm text-[#8A8F97] mb-8">
        Note: since fees now go through Razorpay's hosted payment page directly,
        this log stays empty unless a webhook is set up to record payments here.
      </p>

      {loading ? (
        <p className="text-sm text-[#8A8F97]">Loading...</p>
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