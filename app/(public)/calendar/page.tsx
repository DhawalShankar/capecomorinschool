// app/(public)/calendar/page.tsx
export default function AcademicCalendar() {
  const events = [
    { date: "15 Aug 2026", title: "Independence Day", type: "Holiday" },
    { date: "1–15 Oct 2026", title: "Term 1 Examinations", type: "Exam" },
    { date: "31 Oct 2026", title: "Diwali Break Begins", type: "Holiday" },
    { date: "26 Jan 2027", title: "Republic Day", type: "Holiday" },
  ];
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Academic Calendar</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-10">
        This Year at a Glance
      </h1>
      <div className="divide-y divide-[#E5DFD0] border-t border-b border-[#E5DFD0]">
        {events.map((e) => (
          <div key={e.title} className="flex items-center justify-between py-4">
            <div>
              <div className="font-medium text-[#16233F]">{e.title}</div>
              <div className="text-sm text-[#5B5F66]">{e.date}</div>
            </div>
            <span className="text-xs uppercase tracking-wide text-[#8B2E3F] border border-[#8B2E3F] rounded-full px-3 py-1">
              {e.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}