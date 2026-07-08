// app/admin/teachers/page.tsx
"use client";
import { useEffect, useState } from "react";

type Teacher = {
  id: number;
  name: string;
  subject: string | null;
  grade_level: string | null;
  bio: string | null;
  published: boolean;
};

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [saving, setSaving] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function loadTeachers() {
    setLoading(true);
    const res = await fetch(`${API}/api/teachers`, { cache: "no-store" });
    setTeachers(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`${API}/api/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, grade_level: gradeLevel }),
    });
    setName("");
    setSubject("");
    setGradeLevel("");
    setSaving(false);
    loadTeachers();
  }

  async function togglePublished(t: Teacher) {
    await fetch(`${API}/api/teachers/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !t.published }),
    });
    loadTeachers();
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this teacher from the roster?")) return;
    await fetch(`${API}/api/teachers/${id}`, { method: "DELETE" });
    loadTeachers();
  }

  return (
    <div className="max-w-3xl">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-2">
        Teachers
      </h1>
      <p className="text-sm text-[#8A8F97] mb-8">
        This is your internal staff roster — separate from the public
        Faculty page, which never lists names by design.
      </p>

      <form onSubmit={handleAdd} className="bg-white border border-[#E5DFD0] rounded p-6 mb-10 grid sm:grid-cols-3 gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="border border-[#E5DFD0] rounded px-4 py-2 text-sm sm:col-span-3"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border border-[#E5DFD0] rounded px-4 py-2 text-sm"
        />
        <input
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          placeholder="Grade / Class"
          className="border border-[#E5DFD0] rounded px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-[#8B2E3F] hover:bg-[#732634] disabled:opacity-60 transition-colors text-white px-6 py-2.5 rounded font-medium text-sm"
        >
          {saving ? "Adding..." : "Add Teacher"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-[#8A8F97]">Loading...</p>
      ) : (
        <div className="divide-y divide-[#E5DFD0] border-t border-b border-[#E5DFD0]">
          {teachers.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-[#16233F] text-sm">{t.name}</div>
                <div className="text-xs text-[#5B5F66]">
                  {t.subject || "—"} {t.grade_level ? `· ${t.grade_level}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => togglePublished(t)}
                  className={`text-xs px-2 py-1 rounded ${t.published ? "bg-[#E9F3EC] text-green-700" : "bg-[#F3E9E9] text-[#8B2E3F]"}`}
                >
                  {t.published ? "Active" : "Inactive"}
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-xs text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}