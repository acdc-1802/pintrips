import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';

// import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PinTrips</h1>
        </header>
        {/*        
          <Routes />
        */}
        <div className="App-intro">
          <LoginPage />
        </div>
      </div>
    );
  }
}

export default App;
