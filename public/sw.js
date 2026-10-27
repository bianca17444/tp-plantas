// Service Worker de "Mis Plantas".
// - Al instalarse guarda en caché la portada, la página sin conexión y los íconos.
// - Páginas (navegación): primero la red; si no hay conexión, la copia guardada;
//   si tampoco hay copia, la página /offline.
// - Archivos estáticos (JS, CSS, imágenes): primero la caché.

const CACHE = 'plantas-v1';
const PRECARGA = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Se guarda uno por uno: si alguno falla, los demás igual quedan.
      Promise.all(PRECARGA.map((url) => cache.add(url).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // 1) Navegación entre páginas: network-first.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copia));
          return respuesta;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match('/offline')))
    );
    return;
  }

  // 2) Archivos estáticos: cache-first.
  const esEstatico =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.json' ||
    url.pathname === '/icon.png';

  if (esEstatico) {
    event.respondWith(
      caches.match(request).then(
        (guardada) =>
          guardada ||
          fetch(request).then((respuesta) => {
            const copia = respuesta.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copia));
            return respuesta;
          })
      )
    );
  }
});
