import React, { Component } from 'react';
import { Navbar } from './client/components';
import Routes from './client/routes'
import { Sidebar } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div id='full-page'>
        <Navbar />
        <Routes />
     </div>
    );
  }
}

export default App;
