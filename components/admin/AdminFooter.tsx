// components/admin/AdminFooter.tsx
"use client";
import { useEffect, useState } from "react";

type Status = "checking" | "online" | "offline";

function useBackendStatus(url: string) {
  const [status, setStatus] = useState<Status>("checking");
  useEffect(() => {
    let cancelled = false;
    async function ping() {
      try {
        const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
        });
        if (!cancelled) setStatus(res.ok ? "online" : "offline");
      } catch {
        if (!cancelled) setStatus("offline");
      }
    }
    ping();
    // Re-check every 60s so the dot stays accurate if it wakes up or
    // goes back to sleep while the admin panel stays open in a tab.
    const interval = setInterval(ping, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [url]);
  return status;
}

function statusDotColor(status: Status) {
  return status === "online"
    ? "bg-green-500"
    : status === "offline"
    ? "bg-red-500"
    : "bg-yellow-400";
}

export default function AdminFooter() {
  const vritukulStatus = useBackendStatus("https://vritukul-backend.onrender.com/");
  const ccsStatus = useBackendStatus("https://ccs-backend-7vam.onrender.com/");

  const vritukulDotColor = statusDotColor(vritukulStatus);
  const ccsDotColor = statusDotColor(ccsStatus);

  const vritukulLabel =
    vritukulStatus === "online"
      ? "Vritukul: Online"
      : vritukulStatus === "offline"
      ? "Vritukul: Waking up / Offline"
      : "Vritukul: Checking...";

  const ccsLabel =
    ccsStatus === "online"
      ? "CCS: Online"
      : ccsStatus === "offline"
      ? "CCS: Waking up / Offline"
      : "CCS: Checking...";

  return (
    <footer className="px-4 sm:px-6 py-4 border-t border-[#E5DFD0] flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-xs text-[#8A8F97] text-center sm:text-left">
      <span className="truncate max-w-full">
        © {new Date().getFullYear()} Cape Comorin School — Admin Panel. Internal use only.
      </span>
      <span className="flex items-center gap-3 shrink-0">
        <span className="flex items-center gap-1.5" title={vritukulLabel}>
          <span className={`w-2 h-2 rounded-full ${vritukulDotColor}`} />
          {vritukulLabel}
        </span>
        <span className="flex items-center gap-1.5" title={ccsLabel}>
          <span className={`w-2 h-2 rounded-full ${ccsDotColor}`} />
          {ccsLabel}
        </span>
      </span>
    </footer>
  );
}