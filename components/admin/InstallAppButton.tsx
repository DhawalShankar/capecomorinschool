// components/admin/InstallAppButton.tsx
"use client";
import { useState } from "react";
import { usePWAInstall } from "@/components/admin/hooks/usePWAInstall";

export default function InstallAppButton({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "dropdown";
}) {
  const { canShow, isIOS, canPromptNatively, promptInstall } = usePWAInstall();
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  if (!canShow) return null;

  async function handleClick() {
    if (canPromptNatively) {
      await promptInstall();
    } else if (isIOS) {
      setShowIOSHelp(true);
    }
  }

  const baseClasses =
  variant === "sidebar"
    ? "flex items-center gap-2 w-full px-3 py-2 rounded text-sm font-medium text-[#C9C4B8] hover:bg-[#1F3055] hover:text-[#FAF6EE] transition-colors"
    : "mx-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#E5DFD0] bg-white text-sm font-medium text-[#16233F] hover:border-[#C9A227] hover:bg-[#C9A227]/5 hover:text-[#8B2E3F] transition-colors shadow-sm";
  return (
    <>
      <button onClick={handleClick} className={baseClasses}>
        <DownloadIcon />
        Install App
      </button>

      {showIOSHelp && (
        <div
          className="fixed inset-0 bg-[#16233F]/40 flex items-center justify-center p-4 z-50"
          onClick={() => setShowIOSHelp(false)}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-[#16233F] mb-3">Install on iPhone/iPad</h3>
            <ol className="text-sm text-[#5B5F66] space-y-2 list-decimal list-inside mb-5">
              <li>
                Tap the <strong>Share</strong> icon in Safari&apos;s toolbar
              </li>
              <li>
                Scroll down and tap <strong>Add to Home Screen</strong>
              </li>
              <li>
                Tap <strong>Add</strong> in the top right
              </li>
            </ol>
            <button
              onClick={() => setShowIOSHelp(false)}
              className="w-full bg-[#8B2E3F] hover:bg-[#732634] transition-colors text-white rounded px-4 py-2 text-sm font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}