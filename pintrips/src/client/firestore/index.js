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
const db = firebase.firestore()
const settings = { timestampsInSnapshots: true};
db.settings(settings);
export default db;

// //offline caching
// db.collection('boards')
//   .onSnapshot({ includeQueryMetadataChanges: true }, function(snapshot) {
//     snapshot.docChanges.forEach(function(change) {
//         if (change.type === "added") {
//             console.log("New Board: ", change.doc.data());
//         }

//         var source = snapshot.metadata.fromCache ? "local cache" : "server";
//         console.log("Data came from " + source);
//     });
//   });

// export default db


