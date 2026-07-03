// app/(public)/academics/page.tsx
export default function Academics() {
  const points = [
    ["Playgroup to Class 8", "A complete early-to-middle school journey under one roof."],
    ["English Medium", "All instruction in English, from the very first year."],
    ["Government Recognized", "Fully recognized institution, held to real academic standards."],
    ["Focus on Fundamentals", "Strong grounding in language, math, and science — not shortcuts."],
  ];
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Academics</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-6">
        How We Teach
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        Our academic approach is built around one idea: real understanding
        matters more than rote memorization. From Playgroup through Class 8,
        every year is designed to build genuinely on the one before it.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {points.map(([title, desc]) => (
          <div key={title} className="border border-[#E5DFD0] bg-white rounded p-6">
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[#16233F] mb-2">
              {title}
            </h3>
            <p className="text-sm text-[#5B5F66] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}