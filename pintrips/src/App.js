import React, { Component } from 'react';
import logo from './logo.svg';
import HomePage from './client/components/HomePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
           
           <HomePage/>
     </div>
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