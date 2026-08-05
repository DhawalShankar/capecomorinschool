// app/admin/layout.tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Panel — Cape Comorin Children School",
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CCS Admin",
  },
  icons: {
    icon: [{ url: "/admin/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/admin/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#16233F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}