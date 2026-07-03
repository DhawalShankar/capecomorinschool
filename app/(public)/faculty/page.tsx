// app/(public)/faculty/page.tsx
export default function Faculty() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Faculty</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-4">
        Our Teachers
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        Our teachers are the backbone of everything we do. Staff profiles
        will appear here — managed directly from the admin panel.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-[#E5DFD0] bg-white rounded p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-[#F0EAD8] mx-auto mb-4" />
            <div className="font-medium text-[#16233F]">Teacher Name</div>
            <div className="text-sm text-[#5B5F66]">Subject / Grade</div>
          </div>
        ))}
      </div>
    </div>
  );
}