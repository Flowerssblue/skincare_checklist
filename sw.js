// Ritual — service worker
// Para publicar una actualización: cambia VERSION (y la misma en index.html) y haz push.
const VERSION = '1.1.2';
const CACHE = 'ritual-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache:'reload' salta la caché HTTP de GitHub Pages (10 min); si no, la versión nueva podía guardar el index.html viejo
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))));
  // No activamos sola: esperamos a que la usuaria toque "Actualizar".
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('ritual-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

// Archivos propios: primero la copia guardada (abre al instante y sin internet).
// Lo de otros sitios (el lector de etiquetas) va directo a internet.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request))
  );
});
