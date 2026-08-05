// app/(public)/fees/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fee Payment",
  description: "Pay school fees online for your child at Cape Comorin Children School, Kanpur.",
};

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}