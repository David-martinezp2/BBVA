/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',                 // Cachea la página principal
    '/index.html',        // Archivo HTML principal
    '/static/js/bundle.js',  // Archivos de JavaScript
    '/static/js/main.chunk.js',
    '/static/js/vendors~main.chunk.js',
    '/static/css/main.css',  // Archivos de CSS
    '/logo192.png',       // Recursos estáticos como imágenes
    '/favicon.ico'
];

// Instalación del Service Worker y cacheo de archivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos cacheados correctamente');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar solicitudes de red y servir desde la caché si es posible
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Devuelve el recurso cacheado si está disponible
                if (response) {
                    return response;
                }
                // Si no está en la caché, realiza una solicitud de red normal
                return fetch(event.request);
            })
            .catch(() => caches.match('/index.html')) // Si falla la red, muestra la página principal cacheada
    );
});

// Activación del Service Worker y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
