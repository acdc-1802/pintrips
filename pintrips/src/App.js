import React, { Component } from 'react';
import logo from './logo.svg';
import HomePage from './client/components/HomePage';
import Navbar from './client/components/Navbar';
import LoginPage from './LoginPage';
import './App.css';
class App extends Component {
  render() {
    return (
      <div>
      <div className='App'>
           <Navbar/>
           
           <div className="login-container">
           <LoginPage/>
           </div>
           </div>
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