// app/(public)/fees/page.tsx
"use client";
import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function FeePayment() {
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handlePay() {
    if (!studentId || !amount) return;
    setStatus("loading");

    try {
      // 1. Ask Flask to create a Razorpay order
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fees/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_digital_id: studentId, amount: parseFloat(amount) }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const order = await orderRes.json();

      // 2. Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Cape Comorin School",
        description: `Fee payment for ${studentId}`,
        order_id: order.order_id,
        handler: async function (response: any) {
          // 3. Verify payment with Flask after success
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fees/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const result = await verifyRes.json();
          setStatus(result.status === "paid" ? "success" : "error");
        },
        modal: {
          ondismiss: function () {
            setStatus("idle");
          },
        },
        theme: { color: "#8B2E3F" },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-lg mx-auto px-6 py-20">
        <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Fee Payment</div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-8">
          Pay School Fees
        </h1>

        <div className="bg-white border border-[#E5DFD0] rounded p-8 space-y-4">
          {status === "success" ? (
            <p className="text-[#16233F] font-medium">
              Payment successful — thank you! A confirmation has been recorded.
            </p>
          ) : (
            <>
              <input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student Digital ID (e.g. CC-1045)"
                className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (₹)"
                type="number"
                className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm"
              />
              <button
                onClick={handlePay}
                disabled={status === "loading"}
                className="w-full bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
              >
                {status === "loading" ? "Processing..." : "Pay Now"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600 text-center">
                  Something went wrong — please try again.
                </p>
              )}
              <p className="text-xs text-[#8A8F97] text-center">
                Test environment — no real transaction will occur.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}