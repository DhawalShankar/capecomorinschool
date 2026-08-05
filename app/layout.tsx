// app/layout.tsx
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import PWAInstallInit from "@/components/PWAInstallInit";

export const metadata: Metadata = {
  title: {
    default: "Cape Comorin Children School | Where the Dreams are Nurtured",
    template: "%s | Cape Comorin Children School",
  },
  description: "Cape Comorin Children School, Kanpur — English-medium, government-recognized school for Playgroup to Class 8. Where the Dreams are Nurtured.",
  keywords: ["Cape Comorin Children School", "Kanpur school", "Ratan Lal Nagar school", "Playgroup Kanpur", "English medium school Kanpur"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PWAInstallInit />
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}