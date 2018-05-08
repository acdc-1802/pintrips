import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar } from './client/components';
import Routes from './client/routes'

class App extends Component {

  render() {
    const idb = window.indexedDB
    function createIndexDB() {
      if (!('indexDB' in window)) {return null;} 
      return idb.open('dashboard', 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames. contains('events')) {
          const eventsOS = upgradeDb.cr3eateObjectStore('events', {keyPath: 'id'});
        }
      });
    }
    const dbPromise = createIndexDB();
    console.log('base', window.indexedDB)
    return (
      <div>
        <Navbar />
        {/* BELOW IS WHERE WE'LL SWITCH BETWEEN COMPONENTS BASED ON ROUTES/LINKS */}
        <Routes />
     </div>
    );
  }
}

export default App;
