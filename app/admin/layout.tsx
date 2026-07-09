// app/admin/layout.tsx
"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminFooter from "@/components/admin/AdminFooter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login" || pathname === "/admin/login";

  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setChecking(false);

      if (!firebaseUser && !isLoginPage) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center">
        <p className="text-sm text-[#8A8F97]">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
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