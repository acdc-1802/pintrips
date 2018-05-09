// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

var cacheName = 'WWW-EXAMPLE-COM-V1';
var filesToCache = [
    '/',                // index.html
    '/index.js',
    '/style.css',
    '/attributes/logo.png',
    '/attributes/pin.png',
    '/static/js/bundle.js'
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
  console.log('FEtch')
  if (navigator.onLine) {
    console.log('im online', event.request)
    fetch(event.request).then(function(response) {
      console.log('i fetched')
      let responseClone = response.clone();
      caches.open('dashboard').then(function(cache) {
        cache.put(event.request, responseClone);
      });

      return response;
    });
  } else {
    console.log('im here in the else')
    caches.match(event.request).then(function(resp) {
      console.log('line 44')
      return resp;
    
    })
    .catch(function() {
      console.log('in 49')
         return caches.match('/static/js/bundle.js');
      })
    
  }
});
console.log("HEY")
  // event.respondWith(
  //     return resp || fetch(event.request).then(function(response) {
  //       let responseClone = response.clone();
  //       caches.open('v1').then(function(cache) {
  //         cache.put(event.request, responseClone);
  //       });

  //       return response;
  //     });
  //   }).catch(function() {
  //     return caches.match('/sw-test/gallery/myLittleVader.jpg');
  //   })
  // );

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
