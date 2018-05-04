import React, { Component } from 'react';
import logo from './logo.svg';
import {Navbar} from './client/components';
import Routes from './client/routes'
import './App.css';
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
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