const firebase = require("firebase")
require("firebase/firestore")
require("firebase/auth")


var config = {
  apiKey: "AIzaSyBXvgyD8ma7sMx6wKXA_YtspWX0v7pI0wY",
  authDomain: "pintrips-4e855.firebaseapp.com",
  databaseURL: "https://pintrips-4e855.firebaseio.com",
  projectId: "pintrips-4e855",
  storageBucket: "pintrips-4e855.appspot.com",
  messagingSenderId: "1059240705357"
}


firebase.initializeApp(config)
// const db = firebase.firestore()

firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      const db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

export default db