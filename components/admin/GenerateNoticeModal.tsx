"use client";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onPublished: () => void;
  API: string | undefined;
};

export default function GenerateNoticeModal({ onClose, onPublished, API }: Props) {
  const [step, setStep] = useState<"prompt" | "fields" | "draft">("prompt");
  const [prompt, setPrompt] = useState("");
  const [calendarMatched, setCalendarMatched] = useState(true);
  const [primaryEvent, setPrimaryEvent] = useState<any>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [timing, setTiming] = useState("");
  const [venue, setVenue] = useState("");
  const [classes, setClasses] = useState("");
  const [nearbyEvents, setNearbyEvents] = useState<any[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePromptSubmit() {
    setLoading(true);
    setError("");
    const res = await fetch(`${API}/api/notices/generate-draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || "Something went wrong");

    setCalendarMatched(data.calendar_matched);
    setPrimaryEvent(data.primary_event);
    setNearbyEvents(data.nearby_events || []);

    // Pre-fill from matched event, or leave blank for manual entry
    setEventTitle(data.primary_event?.title || "");
    setEventDate(data.primary_event?.date || "");

    setStep("fields");
  }

  async function handleFieldsSubmit() {
    setLoading(true);
    const included = nearbyEvents.filter((e) => e.include);
    const res = await fetch(`${API}/api/notices/generate-draft/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        primary_event: primaryEvent, // null if unmatched — groq_client handles this
        event_title: eventTitle,
        date: eventDate,
        timing,
        venue,
        classes,
        include_events: included,
      }),
    });
    const data = await res.json();
    setLoading(false);
    setDraft(data.draft_text);
    setStep("draft");
  }

  async function handlePublish() {
    setLoading(true);
    await fetch(`${API}/api/notices/finalize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final_text: draft, classes, event_title: eventTitle || "Notice" }),
    });
    setLoading(false);
    onPublished();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-lg space-y-4">
        {step === "prompt" && (
          <>
            <h2 className="font-semibold text-lg text-[#16233F]">Generate Notice</h2>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 15 ko PTM hai"
              className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="text-sm px-4 py-2">Cancel</button>
              <button
                onClick={handlePromptSubmit}
                disabled={loading || !prompt}
                className="bg-[#8B2E3F] text-white px-4 py-2 rounded text-sm"
              >
                {loading ? "Checking calendar..." : "Next"}
              </button>
            </div>
          </>
        )}

        {step === "fields" && (
          <>
            <h2 className="font-semibold text-lg text-[#16233F]">A few details</h2>

            {!calendarMatched && (
              <p className="text-xs bg-[#FFF7E6] border border-[#F0D48A] text-[#8A6D00] rounded px-3 py-2">
                This isn't on your calendar — creating a one-off notice. Please fill in the event details below.
              </p>
            )}

            {calendarMatched ? (
              <p className="text-sm text-[#5B5F66]">Event: {primaryEvent.title} on {primaryEvent.date}</p>
            ) : (
              <>
                <input
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Notice subject (e.g. Fees due date extended)"
                  className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
                />
              </>
            )}

            <input
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder="Timing (e.g. 10:00 AM - 12:00 PM)"
              className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
            />
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Venue (optional)"
              className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
            />
            <input
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              placeholder="Classes (e.g. VI - VIII & IX, or All Classes)"
              className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
            />

            {nearbyEvents.length > 0 && (
              <div className="text-sm">
                <p className="mb-1 text-[#5B5F66]">Include these nearby events too?</p>
                {nearbyEvents.map((e, i) => (
                  <label key={i} className="flex items-center gap-2 text-black">
                    <input
                      type="checkbox"
                      checked={e.include}
                      onChange={() => {
                        const updated = [...nearbyEvents];
                        updated[i].include = !updated[i].include;
                        setNearbyEvents(updated);
                      }}
                    />
                    {e.title} ({e.date})
                  </label>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="text-sm px-4 py-2">Cancel</button>
              <button
                onClick={handleFieldsSubmit}
                disabled={loading || (!calendarMatched && (!eventTitle || !eventDate))}
                className="bg-[#8B2E3F] text-white px-4 py-2 rounded text-sm disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate Draft"}
              </button>
            </div>
          </>
        )}

        {step === "draft" && (
          <>
            <h2 className="font-semibold text-lg text-[#16233F]">Review & edit</h2>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={10}
              className="w-full border border-[#E5DFD0] text-black rounded px-4 py-2 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="text-sm px-4 py-2">Cancel</button>
              <button onClick={handlePublish} disabled={loading} className="bg-[#8B2E3F] text-white px-4 py-2 rounded text-sm">
                {loading ? "Publishing..." : "Confirm & Publish"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}