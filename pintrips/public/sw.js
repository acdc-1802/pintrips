// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

var cacheName = 'WWW-EXAMPLE-COM-V1';
var filesToCache = [
    '/',                // index.html
    '/index.js',
    '/style.css',
    '/attributes/logo.png',
    '/attributes/pin.png'
];

self.addEventListener('install', function(event) {
  console.log("SW installed");
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
        console.info('[sw.js] cached all files');
        return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!", event.request)
  event.respondWith(
    fetch(event.request)
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          if(response){
              return response
          }
          // not in cache, return from network
          return fetch(event.request, {credentials: 'include'});
      })
  );
});
