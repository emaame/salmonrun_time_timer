const VERSION = "2.0.0.0";
const CACHE_NAME = `salmonrun_time_timer-${VERSION}`;
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache
                .addAll([
                    `./`,
                    `./index.html`,
                    `./favicon.png`,
                    `./favicon_stt.png`,
                    `./favicon_stt2.png`,
                    `./bundle.js`,
                    `./golden_egg.png`,
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

self.addEventListener("activate", function (evt) {
    evt.waitUntil(
        caches.keys().then(function (keys) {
            var promises = [];
            keys.forEach(function (cacheName) {
                if (cacheName != CACHE_NAME)
                    promises.push(caches.delete(cacheName));
            });
            return Promise.all(promises);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.match(event.request, { ignoreSearch: true }))
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
