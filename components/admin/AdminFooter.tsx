// components/admin/AdminFooter.tsx
export default function AdminFooter() {
  return (
    <footer className="px-6 py-4 border-t border-[#E5DFD0] text-center text-xs text-[#8A8F97]">
      © {new Date().getFullYear()} Cape Comorin School — Admin Panel. Internal use only.
    </footer>
  );
}