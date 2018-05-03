import React, { Component } from 'react';
import logo from './logo.svg';
import Navbar from './client/components/Navbar';
import './App.css';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBXvgyD8ma7sMx6wKXA_YtspWX0v7pI0wY",
  authDomain: "pintrips-4e855.firebaseapp.com",
  projectId: "pintrips-4e855"
});
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection('users').add({
  first: 'Ada', 
  last: 'Lovelace',
  born: 1815
})
.then(function(docRef) {
  console.log('Document written with ID: ', docRef.id);
})
.catch(function(error) {
  console.error('Error adding document: ', error);
})

db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  });
});

db.collection('boards').doc()
.collection('pins').add({
  date: 'Thursday'
})
class App extends Component {
  render() {
    return (
      <Navbar/>
    );
  }
}

export default App;

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <h1 className="App-title">PinTrips</h1>
//   </header>
//   <p className="App-intro">
//     Hello World bitches
//   </p>
// </div>