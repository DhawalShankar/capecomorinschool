// components/admin/AdminFooter.tsx
"use client";
import { useEffect, useState } from "react";

type Status = "checking" | "online" | "offline";

export default function AdminFooter() {
  const [vritukulStatus, setVritukulStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;

    async function pingVritukul() {
      try {
        const res = await fetch("https://vritukul-backend.onrender.com/", {
          method: "GET",
          cache: "no-store",
        });
        if (!cancelled) setVritukulStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setVritukulStatus("offline");
      }
    }

    pingVritukul();

    // Re-check every 60s so the dot stays accurate if it wakes up or
    // goes back to sleep while the admin panel stays open in a tab.
    const interval = setInterval(pingVritukul, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const dotColor =
    vritukulStatus === "online"
      ? "bg-green-500"
      : vritukulStatus === "offline"
      ? "bg-red-500"
      : "bg-yellow-400";

  const label =
    vritukulStatus === "online"
      ? "Vritukul: Online"
      : vritukulStatus === "offline"
      ? "Vritukul: Waking up / Offline"
      : "Vritukul: Checking...";

  return (
    <footer className="px-6 py-4 border-t border-[#E5DFD0] flex items-center justify-between text-xs text-[#8A8F97]">
      <span>© {new Date().getFullYear()} Cape Comorin School — Admin Panel. Internal use only.</span>
      <span className="flex items-center gap-1.5" title={label}>
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        {label}
      </span>
    </footer>
  );
}