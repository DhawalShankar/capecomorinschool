// app/(public)/admissions/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions 2026–27 | Cape Comorin School, Kanpur",
  description: "Admissions open for Playgroup to Class 8 at Cape Comorin School, Ratan Lal Nagar, Kanpur. Fill the enquiry form and our team will reach out.",
};

export default function AdmissionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}