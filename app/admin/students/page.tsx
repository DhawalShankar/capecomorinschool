// app/admin/students/page.tsx
export default function AdminStudents() {
  return (
    <div className="max-w-2xl">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Admin Panel</div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16233F] mb-4">
        Student Records
      </h1>
      <div className="bg-white border border-[#E5DFD0] rounded p-8">
        <p className="text-sm text-[#5B5F66] leading-relaxed">
          Student search, viewing, editing, and TC generation are powered
          by Vritukul, not this backend directly. This page will connect
          once the Vritukul proxy service is built in{" "}
          <code className="bg-[#FAF6EE] px-1.5 py-0.5 rounded">ccs-backend</code>.
        </p>
      </div>
    </div>
  );
}