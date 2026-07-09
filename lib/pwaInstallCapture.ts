// lib/pwaInstallCapture.ts
export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Module-level (survives across component mounts/unmounts, resets only on full page reload)
let capturedEvent: BeforeInstallPromptEvent | null = null;
let listeners: Array<(e: BeforeInstallPromptEvent) => void> = [];

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    capturedEvent = e as BeforeInstallPromptEvent;
    listeners.forEach((cb) => cb(capturedEvent!));
  });
}

export function getCapturedPrompt() {
  return capturedEvent;
}

export function onPromptCaptured(cb: (e: BeforeInstallPromptEvent) => void) {
  listeners.push(cb);
  // If already captured before this subscriber existed, notify immediately
  if (capturedEvent) cb(capturedEvent);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function clearCapturedPrompt() {
  capturedEvent = null;
}