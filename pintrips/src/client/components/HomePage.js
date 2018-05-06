import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import MapCard from './MapCard';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')
var networkDataReceived = false;

startSpinner();

// fetch fresh data
var networkUpdate = fetch('/data.json').then(function(response) {
  return response.json();
}).then(function(data) {
  networkDataReceived = true;
  updatePage();
});

// fetch cached data
caches.match('/data.json').then(function(response) {
  if (!response) throw Error("No data");
  return response.json();
}).then(function(data) {
  // don't overwrite newer network data
  if (!networkDataReceived) {
    updatePage(data);
  }
}).catch(function() {
  // we didn't get cached data, the network is our last hope:
  return networkUpdate;
}).catch(showErrorMessage).then(stopSpinner);
console.log('caches')
const HomePage = (props) => {
  const user = props._user;
  if (!user) return 'You must login';
  return (
    <div>
    if(networkDataReceived) {
      <div className='card-group'>
      <Map from={allBoards.where('creator', '==', `${user.uid}`)}
      Loading={() => 'Loading...'}
      Render={(props) => {
        return (
          <MapCard board={props} />
        )
      }}
      />
      </div>
    }
    if(!networkDataReceived) {
      <div className='card-group'>
      <Map from={allBoards.where('creator', '==', `${user.uid}`)}
      Loading={() => 'Loading...'}
      Render={(props) => {
        return (
          <MapCard board={props} />
        )
      }}
      />
      </div>
    }
    </div>
  );
}

export default withAuth(HomePage);




