// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://capecomorinschool.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/academics`, lastModified: new Date() },
    { url: `${base}/admissions`, lastModified: new Date() },
    { url: `${base}/gallery`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}