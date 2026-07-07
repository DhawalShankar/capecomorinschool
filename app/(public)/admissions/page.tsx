// app/(public)/admissions/page.tsx
"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Admissions() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_ADMISSIONS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admissions</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-4">
        Admissions Open — 2026–27
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        Cape Comorin School, Kanpur welcomes new admissions from Playgroup
        through Class 8. Fill in the enquiry form below and our admissions
        team will get in touch with next steps.
      </p>

      <div className="bg-white border border-[#E5DFD0] rounded p-8 max-w-lg">
        {submitted ? (
          <p className="text-[#16233F] font-medium">
            Thank you — we've received your enquiry and will reach out soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="from_name" required placeholder="Parent / Guardian Name" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input name="child_name" required placeholder="Child's Name" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input name="from_phone" required placeholder="Phone Number" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input name="class_applying" placeholder="Class Applying For" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <button
              type="submit"
              disabled={sending}
              className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
            >
              {sending ? "Sending..." : "Submit Enquiry"}
            </button>
            {error && (
              <p className="text-sm text-red-600">
                Something went wrong — please try again or call us directly.
              </p>
            )}
          </form>
        )}
      </div>

      {/* ---------- Reassurance section — deliberately below the form ---------- */}
      <div className="mt-20 max-w-2xl">
        <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Our Assurance</div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16233F] mb-4">
          Choosing the right school is one of the most important decisions you'll make for your child
        </h2>
        <p className="text-[#3A3E45] leading-relaxed">
          The early years of school shape a child's confidence, discipline,
          and character for life — far beyond marks and report cards. At
          Cape Comorin School, every enquiry is followed up personally by
          our admissions team, who will walk you through the process, answer
          your questions, and help you understand exactly how we nurture
          each child academically, emotionally, and socially — from
          Playgroup all the way through Class 8.
        </p>
      </div>

      <div className="mt-16 max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16233F] mb-6">
          Why Parents Choose Cape Comorin School
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "Experienced, Caring Faculty",
              desc: "Teachers who know every child by name and by need, guiding them through each stage of learning.",
            },
            {
              title: "Safe & Nurturing Campus",
              desc: "A secure, well-supervised environment in Kanpur where children are looked after with attention and care.",
            },
            {
              title: "Holistic Development",
              desc: "A balance of strong academics with sports, arts, and values-based learning, not marks alone.",
            },
            {
              title: "A School That Stays in Touch",
              desc: "From admission enquiry to daily updates, notices, and calendars — parents are never left guessing.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[#E5DFD0] rounded p-5">
              <h3 className="text-[#16233F] font-semibold mb-1.5 text-sm">{item.title}</h3>
              <p className="text-[#3A3E45] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Direct contact fallback ---------- */}
      <div className="mt-16 max-w-2xl border-t border-[#E5DFD0] pt-8">
        <p className="text-[#3A3E45] text-sm leading-relaxed">
          Prefer to talk directly? Reach us at{" "}
          <a href="mailto:ccs.nurturedreams@gmail.com" className="text-[#8B2E3F] underline">
            ccs.nurturedreams@gmail.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919839474191" className="text-[#8B2E3F] underline">
            +91 98394 74191
          </a>
          .
        </p>
      </div>
    </div>
  );
}