// app/(public)/notices/page.tsx
export default function Notices() {
  const notices = [
    { title: "Admissions Open 2026–27", date: "1 Jul 2026" },
    { title: "PTM Schedule — August", date: "20 Jul 2026" },
  ];
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Notice Board</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-10">
        Notices
      </h1>
      <div className="space-y-4">
        {notices.map((n) => (
          <a
            key={n.title}
            href="#"
            className="block border border-[#E5DFD0] bg-white rounded p-5 hover:border-[#C9A227] transition-colors"
          >
            <div className="font-medium text-[#16233F]">{n.title}</div>
            <div className="text-sm text-[#5B5F66] mt-1">{n.date} &middot; View PDF →</div>
          </a>
        ))}
      </div>
    </div>
  );
}