const version = "1.2.2";
const cacheName = `salmonrun_time_timer-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./favicon.png`,
        `./bundle.js`,
        `./styles.css`,
        `./sounds/1.wav`,
        `./sounds/2.wav`,
        `./sounds/3.wav`,
        `./sounds/4.wav`,
        `./sounds/5.wav`,
        `./sounds/10.wav`,
        `./sounds/30.wav`,
        `./sounds/quite-impressed.mp3`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    caches.keys().then(function(keys) {
          var promises = [];
          keys.forEach(function(cacheName) {
            if (cacheName != STATIC_CACHE_NAME)
              promises.push(caches.delete(cacheName));
          });
          return Promise.all(promises);
        }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});