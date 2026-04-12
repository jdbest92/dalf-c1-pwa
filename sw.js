/* Service Worker — DALF C1 Révision
   Stratégie : cache-first pour les assets statiques + data.
   Version : incrémenter CACHE_NAME à chaque build pour forcer le refresh. */

const CACHE_NAME = 'dalf-c1-v3-2026-04-12';
const ASSETS = [
  './',
  './index.html',
  './data.js',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        // Cacher uniquement les ressources de notre scope
        if (resp && resp.status === 200 && req.url.startsWith(self.registration.scope)) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
