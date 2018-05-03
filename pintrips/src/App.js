import React, { Component } from 'react';
import logo from './logo.svg';
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
let db = firebase.firestore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PinTrips</h1>
        </header>
        <p className="App-intro">
          Hello World bitches
        </p>
      </div>
    );
  }
}

export default App;
