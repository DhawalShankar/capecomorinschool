// app/(public)/gallery/page.tsx
export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Gallery</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-4">
        Life at Cape Comorin
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        Real photos coming soon — placeholders below until campus/event
        images are uploaded.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-[#F0EAD8] rounded" />
        ))}
      </div>
    </div>
  );
}