// app/(public)/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: {
    default: "Cape Comorin Children School | Where the Dreams are Nurtured",
    template: "%s | Cape Comorin Children School",
  },
  description: "Cape Comorin Children School, Kanpur — Playgroup to Class 8. Est. 2001. English-medium, government-recognized.",
  keywords: [
    "Cape Comorin Children School",
    "Cape Comorin Children School Kanpur",
    "school Ratan Lal Nagar",
    "Playgroup Kanpur",
    "English medium school Kanpur",
  ],
  openGraph: {
    title: "Cape Comorin Children School | Where the Dreams are Nurtured",
    description: "English-medium, government-recognized school for Playgroup to Class 8 in Ratan Lal Nagar, Kanpur.",
    url: "https://capecomorinschool.com",
    siteName: "Cape Comorin Children School",
    images: [
      {
        url: "https://capecomorinschool.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cape Comorin Children School — Where the Dreams are Nurtured",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cape Comorin Children School | Where the Dreams are Nurtured",
    description: "English-medium, government-recognized school for Playgroup to Class 8 in Ratan Lal Nagar, Kanpur.",
    images: ["https://capecomorinschool.com/og-image.png"],
  },
};

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Cape Comorin Children School",
  description: "English-medium, government-recognized school for Playgroup to Class 8 in Kanpur.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "HIG 295, Ratan Lal Nagar",
    addressLocality: "Kanpur",
    addressRegion: "Uttar Pradesh",
    postalCode: "208022",
    addressCountry: "IN",
  },
  telephone: "+919839474191",
  email: "ccs.nurturedreams@gmail.com",
  url: "https://capecomorinschool.com",
  foundingDate: "2001",
  sameAs: [
    "https://www.facebook.com/capecomorinschool",
    "https://www.instagram.com/ccs.nurturedreams/",
    "https://www.linkedin.com/company/cape-comorin-school/",
  ],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-[#FAF6EE] text-[#22262B]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}