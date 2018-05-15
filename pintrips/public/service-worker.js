import localforage from 'localforage';

const request = self.IndexedDB.open('EXAMPLE_DB', 1);
const db;
const cacheName = 'WWW-EXAMPLE-COM-V1';
const filesToCache = [
    '/',                // index.html
    '/index.html',
    '/index.js',
    '/style.css',
    '/attributes/logo.png',
    '/attributes/pin.png',
    'https://localhost:5000/',
    '/HomePage.js',
    '/SingleBoard.js',
    '/AddNewBoard.js',
    '/CannotFind.js',
    '/SharedWithMe.js',
   
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('WWW-EXAMPLE-COM-V1').then(function(cache) {
      return cache.addAll([
        '/style.css',
        '/index.html',
        '/',
        '/HomePage.js',
        '/SingleBoard.js',
      ]);
    })
  );
});


// self.addEventListener('activate', function(event) {
//   console.log("SW activated");
//   event.waitUntil(
//     caches.keys()
//     .then(function(cacheNames) {
//         return Promise.all(
//             cacheNames.map(function(cName) {
//                 if(cName !== cacheName){
//                     return caches.delete(cName);
//                 }
//             })
//         );
//     })
//   );
// });
navigator.storage.requestPersistent().then(function(granted) {
  if (granted) {
    
  }
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//       caches.match(event.request)
//       .then(function(response) {
//           if(response){
//               return response
//           } else {
//             // clone request stream
//             // as stream once consumed, can not be used again
//             var reqCopy = event.request.clone();

//             return fetch(reqCopy, {credentials: 'include'}) // reqCopy stream consumed
//             .then(function(response) {
//                 // bad response
//                 // response.type !== 'basic' means third party origin request
//                 if(!response || response.status !== 200 || response.type !== 'basic') {
//                     return response; // response stream consumed
//                 }

//                 // clone response stream
//                 // as stream once consumed, can not be used again
//                 var resCopy = response.clone();

//                 // ================== IN BACKGROUND ===================== //

//                 // add response to cache and return response
//                 caches.open(cacheName)
//                 .then(function(cache) {
//                     return cache.put(reqCopy, resCopy); // reqCopy, resCopy streams consumed
//                 });

//                 // ====================================================== //


//                 return response; // response stream consumed
//               })
//           }
//       })
//   );
// });