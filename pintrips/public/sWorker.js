// const request = self.IndexedDB.open('EXAMPLE_DB', 1);
// const db;
// const cacheName = 'pintrips';
// const filesToCache = [
//     '/',                // index.html
//     '/index.js',
//     '/style.css',
//     '/attributes/logo.png',
//     '/attributes/pin.png',
//     '/index.html',
//     '/bundle.js',
//     '/images/icon-48.png',
// 		'/images/icon-128.png',
// 		'/images/icon-144.png',
// 		'/images/icon-152.png',
//     '/images/icon-192.png',
//     '/HomePage.js',
//     '/SharedBoards.js',
//     '/AddNewBoard.js',
//     '/App.js',
//     '/MapCard.js',
//     '/SingleBoard.js'

// ];

// self.addEventListener('install', function(event) {
//   console.log("SW installed");
//   event.waitUntil(
//     caches.open(cacheName)
//     .then(function(cache) {
//         console.info('[sw.js] cached all files');
//         return cache.addAll(filesToCache);
//     })
//   );
// });


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




let cacheName = "Pintrips"
let dataCacheName = "pinningTrips"


self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll([
        '/',                // index.html
        '/index.js',
        '/style.css',
        '/attributes/logo.png',
        '/attributes/pin.png',
        '/index.html',
        '/bundle.js',
        '/images/icon-48.png',
        '/images/icon-128.png',
        '/images/icon-144.png',
        '/images/icon-152.png',
        '/images/icon-192.png',
        '/HomePage.js',
        '/SharedBoards.js',
        '/AddNewBoard.js',
        '/App.js',
        '/MapCard.js',
        '/SingleBoard.js'
			]);
		})
	);
});

self.addEventListener("activate", function(event) {});


self.addEventListener("fetch", function(event) {
	let currentLine = event.request.referrer.slice(event.request.referrer.lastIndexOf("/") + 1) || "Index";

	event.respondWith(
		caches.match(event.request).then(function(response) {

			if (response) {
				return response
			} else {
  
        
			return fetch(event.request)
				.then(function(fetchRes) {
					if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== "basic") {
						return fetchRes;
					}

					let responseToCache = fetchRes.clone();
					return caches.open(currentLine).then(function(cache) {
						cache.put(event.request, fetchRes.clone());
						return fetchRes;
					});
				})
				.catch(() =>
					caches.match("http://localhost:3000/")
				)
				.catch((err) => console.error(err))

			}
		})
	)
});
//This is the service worker with the Cache-first network

// var CACHE = 'pwabuilder-precache';
// var precacheFiles = [
  
//   '/',                // index.html
//   '/index.js',
//   '/style.css',
//   '/attributes/logo.png',
//   '/attributes/pin.png',
//   '/index.html',
//   '/bundle.js',
//   '/images/icon-48.png',
//   '/images/icon-128.png',
//   '/images/icon-144.png',
//   '/images/icon-152.png',
//   '/images/icon-192.png',
//   '/HomePage.js',
//   '/SharedBoards.js',
//   '/AddNewBoard.js',
//   '/App.js',
//   '/MapCard.js',
//   '/SingleBoard.js'
//       /* Add an array of files to precache for your app */
//     ];

// //Install stage sets up the cache-array to configure pre-cache content
// self.addEventListener('install', function(evt) {
//   console.log('The service worker is being installed.');
//   evt.waitUntil(precache().then(function() {
//     console.log('[ServiceWorker] Skip waiting on install');
//       return self.skipWaiting();

//   })
//   );
// });


// //allow sw to control of current page
// self.addEventListener('activate', function(event) {
// console.log('[ServiceWorker] Claiming clients for current page');
//       return self.clients.claim();

// });

// self.addEventListener('fetch', function(evt) {
//   console.log('The service worker is serving the asset.'+ evt.request.url);
//   evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
//   evt.waitUntil(update(evt.request));
// });


// function precache() {
//   return caches.open(CACHE).then(function (cache) {
//     return cache.addAll(precacheFiles);
//   });
// }


// function fromCache(request) {
//   //we pull files from the cache first thing so we can show them fast
//   return caches.open(CACHE).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no-match');
//     });
//   });
// }


// function update(request) {
//   //this is where we call the server to get the newest version of the 
//   //file to use the next time we show view
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response);
//     });
//   });
// }

// function fromServer(request){
//   //this is the fallback if it is not in the cahche to go to the server and get it
// return fetch(request.clone()).then(function(response){ return response})
// }
