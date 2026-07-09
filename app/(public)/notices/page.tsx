// app/(public)/notices/page.tsx
"use client";
import { useState, useEffect } from "react";

type Notice = {
  id: number;
  title: string;
  file_url: string;
  uploaded_at: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${API}/api/notices`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setNotices(data);
        setLoading(false);
      });
  }, [API]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Notice Board</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-10">
        Notices
      </h1>

      {loading ? (
        <p className="text-sm text-[#8A8F97]">Loading...</p>
      ) : notices.length === 0 ? (
        <p className="text-sm text-[#8A8F97]">No notices published yet.</p>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveNotice(n)}
              className="block w-full text-left border border-[#E5DFD0] bg-white rounded p-5 hover:border-[#C9A227] transition-colors"
            >
              <div className="font-medium text-[#16233F]">{n.title}</div>
              <div className="text-sm text-[#5B5F66] mt-1">
                {formatDate(n.uploaded_at)} &middot; View notice →
              </div>
            </button>
          ))}
        </div>
      )}

      {activeNotice && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveNotice(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5DFD0]">
              <div className="font-medium text-[#16233F] text-sm truncate">{activeNotice.title}</div>
              <div className="flex items-center gap-4">
                <a
                  href={`${API}/api/notices/${activeNotice.id}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8B2E3F] hover:underline"
                >
                  Open in new tab
                </a>
                <button
                  onClick={() => setActiveNotice(null)}
                  className="text-[#5B5F66] hover:text-[#16233F] text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <iframe
              src={`${API}/api/notices/${activeNotice.id}/download`}
              className="flex-1 w-full"
              title={activeNotice.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}