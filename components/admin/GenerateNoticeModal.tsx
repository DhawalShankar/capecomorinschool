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
  const [primaryEvent, setPrimaryEvent] = useState<any>(null);
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
    setPrimaryEvent(data.primary_event);
    setNearbyEvents(data.nearby_events);
    setStep("fields");
  }

  async function handleFieldsSubmit() {
    setLoading(true);
    const included = nearbyEvents.filter((e) => e.include);
    const res = await fetch(`${API}/api/notices/generate-draft/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primary_event: primaryEvent, timing, venue, classes, include_events: included }),
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
      body: JSON.stringify({ final_text: draft, classes, event_title: primaryEvent.title }),
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
              className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm"
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
            <p className="text-sm text-[#5B5F66]">Event: {primaryEvent.title} on {primaryEvent.date}</p>
            <input value={timing} onChange={(e) => setTiming(e.target.value)} placeholder="Timing (e.g. 10:00 AM - 12:00 PM)" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue (optional)" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />
            <input value={classes} onChange={(e) => setClasses(e.target.value)} placeholder="Classes (e.g. VI - VIII & IX, or All Classes)" className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm" />

            {nearbyEvents.length > 0 && (
              <div className="text-sm">
                <p className="mb-1 text-[#5B5F66]">Include these nearby events too?</p>
                {nearbyEvents.map((e, i) => (
                  <label key={i} className="flex items-center gap-2">
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
              <button onClick={handleFieldsSubmit} disabled={loading} className="bg-[#8B2E3F] text-white px-4 py-2 rounded text-sm">
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
              className="w-full border border-[#E5DFD0] rounded px-4 py-2 text-sm"
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