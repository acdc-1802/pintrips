importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
e.waitUntil(
  caches.open('airhorner').then(function(cache) {
    return cache.addAll([
      '/',
      '/index.html',
      '/index.html?homescreen=1',
      '/?homescreen=1',
      '/style.css',
      '/scripts/main.min.js',
      '/sounds/airhorn.mp3'
    ]);
  })
);
});