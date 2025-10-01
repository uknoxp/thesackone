const CACHE_NAME = 'sack-one-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    // Adicione aqui todos os seus ficheiros críticos (CSS, JS, imagens)
    // Ex: '/images/mourinho.jpg', '/images/trophies/champions.png', etc.
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});