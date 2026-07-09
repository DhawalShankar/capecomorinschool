// app/admin/students/page.tsx
"use client";
import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/api";

type Student = {
  sr_number: number;
  student_name: string;
  father_name: string;
  mother_name: string;
  dob: string;
  joining_class: string;
  digital_id: string;
  match_score?: number;
};

export default function AdminStudents() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

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
        {results.map((s) => (
          <div key={s.sr_number} className="py-3">
            <div className="font-medium text-[#16233F] text-sm">{s.student_name}</div>
            <div className="text-xs text-[#5B5F66]">
              {s.digital_id} &middot; Father: {s.father_name || "—"} &middot; Class: {s.joining_class || "—"}
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-sm text-[#8A8F97] py-4">No students found.</p>
        )}
      </div>
    </div>
  );
}