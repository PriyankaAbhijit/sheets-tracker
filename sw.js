const CACHE_NAME = 'task-tracker-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // EXCLUDE FIREBASE/GOOGLE FROM CACHE INTERCEPTION
  if (e.request.url.includes('firebase') || e.request.url.includes('googleapis')) {
    return; // Let the browser handle these normally
  }
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
