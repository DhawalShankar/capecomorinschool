// app/layout.tsx
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cape Comorin School | Where the Dreams are Nurtured",
    template: "%s | Cape Comorin School", // child pages ka title isse combine hoga
  },
  description: "Cape Comorin School, Kanpur — English-medium, government-recognized school for Playgroup to Class 8. Where the Dreams are Nurtured.",
  keywords: ["Cape Comorin School", "Kanpur school", "Ratan Lal Nagar school", "Playgroup Kanpur", "English medium school Kanpur"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}