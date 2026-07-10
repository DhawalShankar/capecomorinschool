"use client";
import { useState, type FormEvent } from "react";
import { authedFetch } from "@/lib/api";

type Props = {
  onClose: () => void;
  onCreated: () => void;
  API: string | undefined;
};

type Field = {
  key: string;
  label: string;
  required?: boolean;
};

const FIELDS: readonly Field[] = [
  { key: "student_name", label: "Student Name", required: true },
  { key: "father_name", label: "Father's Name" },
  { key: "mother_name", label: "Mother's Name" },
  { key: "father_address", label: "Father's Address" },
  { key: "dob", label: "Date of Birth (DD-MM-YYYY)" },
  { key: "joining_class", label: "Joining Class" },
  { key: "joining_date", label: "Joining Date (DD-MM-YYYY)" },
  { key: "last_school", label: "Last School" },
] as const;

export default function AddStudentModal({ onClose, onCreated, API }: Props) {
  const [srSeries, setSrSeries] = useState<"old" | "new">("new");
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.student_name?.trim()) {
      setError("Student name is required.");
      return;
    }
    setSaving(true);
    setError("");
    const res = await authedFetch(`${API}/api/students/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sr_series: srSeries }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok || data.error) {
      setError(data.error || "Failed to add student.");
      return;
    }
    onCreated();
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded p-6 w-full max-w-lg space-y-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#5B5F66] hover:text-[#16233F] text-xl leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-[#FAF6EE] transition-colors"
        >
          ×
        </button>

        <h2 className="font-semibold text-lg text-[#16233F] pr-8">Add Student</h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-black">
          <div>
            <label className="block text-xs text-[#5B5F66] mb-1.5">SR Series</label>
            <div className="flex gap-4 text-sm text-black">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={srSeries === "new"}
                  onChange={() => setSrSeries("new")}
                />
                CC (new series)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={srSeries === "old"}
                  onChange={() => setSrSeries("old")}
                />
                CC-OLD (old series)
              </label>
            </div>
          </div>

          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-[#5B5F66] mb-1.5">
                {f.label}{f.required && " *"}
              </label>
              <input
                value={form[f.key] || ""}
                onChange={(e) => updateField(f.key, e.target.value)}
                required={f.required}
                className="w-full border border-[#E5DFD0] text-black rounded px-3 py-2 text-sm"
              />
            </div>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="text-sm px-4 py-2 text-black">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-5 py-2 rounded font-medium text-sm"
            >
              {saving ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}