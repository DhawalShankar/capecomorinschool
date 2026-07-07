import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

// app/(public)/notices/page.tsx
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

async function getNotices(): Promise<Notice[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notices`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}


export const metadata: Metadata = {
  title: "Notice Board",
  description: "Latest notices and announcements from Cape Comorin School, Kanpur.",
};

export default async function Notices() {
  const notices = await getNotices();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Notice Board</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-10">
        Notices
      </h1>

      {notices.length === 0 ? (
        <p className="text-sm text-[#8A8F97]">No notices published yet.</p>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <a
              key={n.id}
              href={n.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-[#E5DFD0] bg-white rounded p-5 hover:border-[#C9A227] transition-colors"
            >
              <div className="font-medium text-[#16233F]">{n.title}</div>
              <div className="text-sm text-[#5B5F66] mt-1">
                {formatDate(n.uploaded_at)} &middot; View PDF →
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}