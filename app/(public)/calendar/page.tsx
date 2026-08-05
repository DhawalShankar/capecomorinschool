import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

// app/(public)/calendar/page.tsx
type CalendarEvent = {
  id: number;
  title: string;
  start_date: string;
  end_date: string | null;
  type: string;
  source: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatRange(event: CalendarEvent) {
  if (!event.end_date || event.end_date === event.start_date) {
    return formatDate(event.start_date);
  }
  return `${formatDate(event.start_date)} – ${formatDate(event.end_date)}`;
}

async function getEvents(): Promise<CalendarEvent[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.sort(
    (a: CalendarEvent, b: CalendarEvent) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
}

export const metadata: Metadata = {
  title: "Academic Calendar",
  description: "Academic calendar for Cape Comorin Children School, Kanpur — term dates, holidays, exams, and PTMs at a glance.",
};

export default async function AcademicCalendar() {
  const events = await getEvents();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Academic Calendar</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-10">
        This Year at a Glance
      </h1>

      {events.length === 0 ? (
        <p className="text-sm text-[#8A8F97]">No events published yet — check back soon.</p>
      ) : (
        <div className="divide-y divide-[#E5DFD0] border-t border-b border-[#E5DFD0]">
          {events.map((e) => (
            <div key={e.id} className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium text-[#16233F]">{e.title}</div>
                <div className="text-sm text-[#5B5F66]">{formatRange(e)}</div>
              </div>
              <span className="text-xs uppercase tracking-wide text-[#8B2E3F] border border-[#8B2E3F] rounded-full px-3 py-1 whitespace-nowrap">
                {e.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}