const CACHE_NAME = 'app-cache-v6';
const CORE_ASSETS = ['/cardStep', '/cardStep/manifest.json', '/cardStep/scanner-beep.mp3'];

// При установке — кешируем ядро и сразу переходим в activated
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())      // <— сразу пропускаем waiting
    );
});

// При активации — удаляем старые кеши, забираем управление и шлём табам сообщение
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())      // <— сразу берём управление
            .then(() => {
                // уведомляем страницы о новом SW
                return self.clients.matchAll({type: 'window'})
                    .then(clients => {
                        clients.forEach(client =>
                            client.postMessage({type: 'SW_ACTIVATED'})
                        );
                    });
            })
    );
});

// Обработаем сообщение от клиента для skipWaiting (если понадобится)
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Динамическое кеширование запросов по origin
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;

                return fetch(event.request).then(networkRes => {
                    if (event.request.method === 'GET' && networkRes.ok) {
                        const copy = networkRes.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                    }
                    return networkRes;
                }).catch(() => {
                    console.error('Ошибка в кэше');
                });
            })
        );
    }
});
