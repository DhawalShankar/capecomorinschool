// app/(public)/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach Cape Comorin Children School at HIG 295, Ratan Lal Nagar, Kanpur. Call +91 98394 74191 or email ccs.nurturedreams@gmail.com.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What classes does Cape Comorin Children School offer?",
      acceptedAnswer: { "@type": "Answer", text: "Cape Comorin Children School offers education from Playgroup through Class 8." },
    },
    {
      "@type": "Question",
      name: "Is Cape Comorin Children School English medium?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, all instruction at Cape Comorin Children School is in English, starting from Playgroup." },
    },
    {
      "@type": "Question",
      name: "Where is Cape Comorin Children School located?",
      acceptedAnswer: { "@type": "Answer", text: "Cape Comorin Children School is located at HIG 295, Ratan Lal Nagar, Kanpur." },
    },
    {
      "@type": "Question",
      name: "Is Cape Comorin Children School government recognized?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, Cape Comorin Children School is a government-recognized institution." },
    },
    {
      "@type": "Question",
      name: "How can I enquire about admissions?",
      acceptedAnswer: { "@type": "Answer", text: "You can fill out the enquiry form on the Admissions page, call +91 98394 74191, or email ccs.nurturedreams@gmail.com." },
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}