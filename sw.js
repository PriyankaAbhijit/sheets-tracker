const CACHE_NAME = 'sheet-tracker-v5';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // If the request is for Firebase (gstatic), let the network handle it normally
  if (e.request.url.includes('gstatic.com')) {
    return; 
  }
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
