import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, Sidebar } from './client/components';
import Routes from './client/routes'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        {/* BELOW IS WHERE WE'LL SWITCH BETWEEN COMPONENTS BASED ON ROUTES/LINKS */}
        <Routes />
     </div>
    );
  }
}

export default App;
