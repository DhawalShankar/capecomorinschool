// app/admin/students/page.tsx
"use client";
import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/api";

type Student = {
  sr_number: number;
  student_name: string;
  father_name: string;
  mother_name: string;
  father_address?: string;
  dob: string;
  joining_class: string;
  joining_date?: string;
  last_school?: string;
  digital_id: string;
  match_score?: number;
  verified?: number;
};

type StudentEditFields = {
  student_name: string;
  mother_name: string;
  father_name: string;
  father_address: string;
  dob: string;
  joining_class: string;
  joining_date: string;
  last_school: string;
};

const EDIT_FIELDS: { key: keyof StudentEditFields; label: string; type?: string }[] = [
  { key: "student_name", label: "Student Name" },
  { key: "father_name", label: "Father's Name" },
  { key: "mother_name", label: "Mother's Name" },
  { key: "father_address", label: "Father's Address" },
  { key: "dob", label: "Date of Birth", type: "date" },
  { key: "joining_class", label: "Joining Class" },
  { key: "joining_date", label: "Joining Date", type: "date" },
  { key: "last_school", label: "Last School" },
];

export default function AdminStudents() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingSr, setEditingSr] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<StudentEditFields | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function loadAllStudents() {
    setLoading(true);
    const res = await authedFetch(`${API}/api/students/list`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAllStudents();
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    // Empty search box — just show everyone again instead of erroring
    // on Vritukul's min_length=2 requirement.
    if (query.trim().length === 0) {
      loadAllStudents();
      return;
    }
    if (query.length < 2) return;

    setLoading(true);
    const res = await authedFetch(`${API}/api/students/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  function startEdit(s: Student) {
    setSaveError(null);
    setEditingSr(s.sr_number);
    setEditForm({
      student_name: s.student_name || "",
      father_name: s.father_name || "",
      mother_name: s.mother_name || "",
      father_address: s.father_address || "",
      dob: s.dob || "",
      joining_class: s.joining_class || "",
      joining_date: s.joining_date || "",
      last_school: s.last_school || "",
    });
  }

  function cancelEdit() {
    setEditingSr(null);
    setEditForm(null);
    setSaveError(null);
  }

  function updateField(key: keyof StudentEditFields, value: string) {
    setEditForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  async function saveEdit(sr_number: number) {
    if (!editForm) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await authedFetch(`${API}/api/students/sr/${sr_number}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSaveError(data.error || "Failed to save changes.");
        setSaving(false);
        return;
      }
      // Merge saved fields into local results so the list reflects the edit
      // without a full refetch.
      setResults((prev) =>
        prev.map((s) => (s.sr_number === sr_number ? { ...s, ...editForm } : s))
      );
      setSaving(false);
      setEditingSr(null);
      setEditForm(null);
    } catch (err) {
      setSaveError("Network error — please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-8">
        Student Records
      </h1>

      <form onSubmit={handleSearch} className="flex text-black gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by student name..."
          className="flex-1 border border-[#E5DFD0] rounded px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="divide-y divide-[#E5DFD0] border-t border-b border-[#E5DFD0]">
        {results.map((s) => {
          const isEditing = editingSr === s.sr_number;
          return (
            <div key={s.sr_number} className="py-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-[#16233F] text-sm">{s.student_name}</div>
                  <div className="text-xs text-[#5B5F66]">
                    {s.digital_id} &middot; Father: {s.father_name || "—"} &middot; Class:{" "}
                    {s.joining_class || "—"}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => startEdit(s)}
                    className="shrink-0 text-xs font-medium text-[#8B2E3F] hover:text-[#732634] border border-[#E5DFD0] rounded px-3 py-1.5 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing && editForm && (
                <div className="mt-4 mb-2 p-4 bg-[#FAF8F2] border border-[#E5DFD0] rounded">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EDIT_FIELDS.map((f) => (
                      <label key={f.key} className="text-xs text-[#5B5F66]">
                        {f.label}
                        <input
                          type={f.type || "text"}
                          value={editForm[f.key]}
                          onChange={(e) => updateField(f.key, e.target.value)}
                          className="mt-1 w-full border border-[#E5DFD0] rounded px-3 py-2 text-sm text-black bg-white"
                        />
                      </label>
                    ))}
                  </div>

                  {saveError && (
                    <p className="text-xs text-[#8B2E3F] mt-3">{saveError}</p>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => saveEdit(s.sr_number)}
                      disabled={saving}
                      className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-5 py-2 rounded font-medium text-xs"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={saving}
                      className="border border-[#E5DFD0] hover:bg-[#F0EDE2] disabled:opacity-60 transition-colors text-[#16233F] px-5 py-2 rounded font-medium text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {results.length === 0 && !loading && (
          <p className="text-sm text-[#8A8F97] py-4">No students found.</p>
        )}
      </div>
    </div>
  );
}