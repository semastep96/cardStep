const CACHE_NAME = 'app-cache-v3';
const CORE_ASSETS = ['/cardStep', 'cardStep/manifest.json', 'cardStep/scanner-beep.mp3'];

// При установке кешируем только «ядро» приложения
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// При активации очищаем старые кеши
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Динамическое кеширование всего, что запрашивается из вашего origin
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // кешируем лишь файлы из вашего приложения
    if (url.origin === self.location.origin) {
        // на любые запросы (js, css, html, json, картинки и т.п.)
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) {
                    return cached;
                }
                return fetch(event.request).then(networkRes => {
                    // в кеш — только успешные GET‑запросы
                    if (event.request.method === 'GET' && networkRes.ok) {
                        console.log({networkRes, event});
                        const copy = networkRes.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, copy));
                    }
                    return networkRes;
                }).catch(() => {
                    console.error('Ошибка в кэше');
                });
            })
        );
    }
});
