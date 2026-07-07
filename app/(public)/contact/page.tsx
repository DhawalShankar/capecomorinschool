// app/(public)/contact/page.tsx
"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const faqs = [
  {
    q: "What classes does Cape Comorin School offer?",
    a: "Cape Comorin School offers education from Playgroup through Class 8.",
  },
  {
    q: "Is Cape Comorin School English medium?",
    a: "Yes, all instruction at Cape Comorin School is in English, starting from Playgroup.",
  },
  {
    q: "Where is Cape Comorin School located?",
    a: "Cape Comorin School is located at HIG 295, Ratan Lal Nagar, Kanpur.",
  },
  {
    q: "Is Cape Comorin School government recognized?",
    a: "Yes, Cape Comorin School is a government-recognized institution.",
  },
  {
    q: "How can I enquire about admissions?",
    a: "You can fill out the enquiry form on our Admissions page, call +91 98394 74191, or email ccs.nurturedreams@gmail.com.",
  },
];

export default function Contact() {
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
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
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
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Contact</div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-6">
            Get in Touch
          </h1>
          <div className="space-y-3 text-[#3A3E45] text-sm">
            <p>📍 HIG 295, Ratan Lal Nagar, Kanpur</p>
            <p>📞 +91 98394 74191</p>
            <p>✉️ ccs.nurturedreams@gmail.com</p>
          </div>
        </div>
        <div className="bg-white border border-[#E5DFD0] rounded p-8">
          {submitted ? (
            <p className="text-[#16233F] font-medium">Thanks — we'll get back to you shortly.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="from_name" required placeholder="Your Name" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
              <input name="from_contact" required placeholder="Email or Phone" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
              <textarea name="message" required placeholder="Message" rows={4} className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
              <button
                type="submit"
                disabled={sending}
                className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
              {error && (
                <p className="text-sm text-red-600">
                  Something went wrong — please try again or call us directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* ---------- FAQ — helps both users and AI search overviews ---------- */}
      <div className="mt-20 max-w-2xl">
        <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">FAQ</div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16233F] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[#E5DFD0] pb-6">
              <h3 className="text-[#16233F] font-semibold mb-2">{f.q}</h3>
              <p className="text-[#5B5F66] text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}