// app/(public)/fees/page.tsx
"use client";

export default function FeePayment() {
  function handlePay() {
    // TODO: call Flask backend to create Razorpay order (test key), then open checkout
  }
  return (
    <div className="max-w-lg mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Fee Payment</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-8">
        Pay School Fees
      </h1>
      <div className="bg-white border border-[#E5DFD0] rounded p-8 space-y-4">
        <input placeholder="Student Digital ID (e.g. CC-1045)" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
        <input placeholder="Amount (₹)" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
        <button
          onClick={handlePay}
          className="w-full bg-[#8B2E3F] hover:bg-[#732634] transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
        >
          Pay Now
        </button>
        <p className="text-xs text-[#8A8F97] text-center">Test environment — no real transaction will occur.</p>
      </div>
    </div>
  );
}