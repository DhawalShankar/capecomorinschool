// app/(public)/admissions/page.tsx
"use client";
import { useState } from "react";

export default function Admissions() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to Flask backend enquiry endpoint
    setSubmitted(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admissions</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-4">
        Admissions Open — 2026–27
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        We welcome new admissions from Playgroup through Class 8. Fill in
        the enquiry form below and our admissions team will get in touch
        with next steps.
      </p>

      <div className="bg-white border border-[#E5DFD0] rounded p-8 max-w-lg">
        {submitted ? (
          <p className="text-[#16233F] font-medium">
            Thank you — we've received your enquiry and will reach out soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Parent / Guardian Name" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input required placeholder="Child's Name" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input required placeholder="Phone Number" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input placeholder="Class Applying For" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <button type="submit" className="bg-[#8B2E3F] hover:bg-[#732634] transition-colors text-white px-6 py-2.5 rounded font-medium text-sm">
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}