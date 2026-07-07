// app/(public)/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach Cape Comorin School at HIG 295, Ratan Lal Nagar, Kanpur. Call +91 98394 74191 or email ccs.nurturedreams@gmail.com.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}