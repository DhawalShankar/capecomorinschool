// public/admin-sw.js
const CACHE_NAME = "ccs-admin-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// A fetch handler is required for Chrome's installability criteria,
// even if it's just a pass-through.
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});