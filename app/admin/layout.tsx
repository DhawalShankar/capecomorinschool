// app/admin/layout.tsx
"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    // Login page renders standalone — no sidebar/topbar/footer
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        <AdminTopbar />
        <main className="flex-1 px-6 py-8">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}