// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    console.log('SERVICE WORKER REGISTERED')
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });

  }
}
window.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   btnAdd.style.display = 'block';
// });
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt fired index'); // It doesn't show at all
});
function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}


import localforage from 'localforage';
console.log('error')
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
    '/HomePage',
    '/SingleBoard',
    '/AddNewBoard',
    '/CannotFind',
    '/SharedWithMe',
    '/manifest.json'
   
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