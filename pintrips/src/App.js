import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PinTrips</h1>
        </header>
        <p className="App-intro">
          <LoginPage />
        </p>
      </div>
    );
  }
}

export default App;
