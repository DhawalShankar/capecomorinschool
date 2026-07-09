// app/(public)/notices/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notice Board",
  description: "Latest notices and announcements from Cape Comorin School, Kanpur.",
};

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}