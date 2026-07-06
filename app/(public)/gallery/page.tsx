// app/(public)/gallery/page.tsx
import Script from "next/script";

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-[#C9A227] uppercase tracking-[0.2em] text-xs mb-3">Gallery</div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#16233F] mb-4">
        Life at Cape Comorin
      </h1>
      <p className="text-[#3A3E45] leading-relaxed mb-12 max-w-2xl">
        A live look at school life, straight from our Instagram —
        updates here automatically, no manual uploads needed.
      </p>

      <div className="rounded overflow-hidden border border-[#E5DFD0] bg-white p-2">
        <div className="elfsight-app-2e14dd99-4c67-4204-9c5a-c84c79d9c746" data-elfsight-app-lazy />
      </div>

      <p className="text-xs text-[#8A8F97] mt-4 text-center">
        Follow us on {" "}
        <a
          href="https://www.instagram.com/ccs.nurturedreams/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B2E3F] hover:underline"
        >
          Instagram
        </a>{" "}
        for more.
      </p>

      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </div>
  );
}