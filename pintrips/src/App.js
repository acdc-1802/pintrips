import React, { Component } from 'react';
import { Navbar } from './client/components';
import Routes from './client/routes'

class App extends Component {
  render() {
    return (
      <div id='full-page'>
        <Navbar />
        {/* BELOW IS WHERE WE'LL SWITCH BETWEEN COMPONENTS BASED ON ROUTES/LINKS */}
        <Routes />
     </div>
    );
  }
}

export default App;
