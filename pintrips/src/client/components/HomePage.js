
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MapCard from './MapCard';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')

class HomePage extends Component {
  constructor(props) {
    super(props)
  }


  render () {
  const idb = window.indexedDB
  const container = document.getElementById('container');
  const offlineMessage = document.getElementById('offline');
  const noDataMessage = document.getElementById('no-data');
  const dataSavedMessage = document.getElementById('data-saved');
  const saveErrorMessage = document.getElementById('save-error');
  const addEventButton = document.getElementById('add-event-button');

  function getServerData() {
    return fetch('api/getAll').then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });
  }
 


  
  function messageOffline() {
    // alert user that data may not be current
    const lastUpdated = getLastUpdated();
    if (lastUpdated) {
      offlineMessage.textContent += ' Last fetched server data: ' + lastUpdated;
    }
    offlineMessage.style.display = 'block';
  }
  
  function messageNoData() {
    // alert user that there is no data available
    noDataMessage.style.display = 'block';
  }
  
  function messageDataSaved() {
    // alert user that data has been saved for offline
    const lastUpdated = getLastUpdated();
    if (lastUpdated) {dataSavedMessage.textContent += ' on ' + lastUpdated;}
    dataSavedMessage.style.display = 'block';
  }
  
  function messageSaveError() {
    // alert user that data couldn't be saved offline
    saveErrorMessage.style.display = 'block';
  }
  
  /* Storage functions */
  
  function getLastUpdated() {
    return localStorage.getItem('lastUpdated');
  }
  
  function setLastUpdated(date) {
    localStorage.setItem('lastUpdated', date);
  }
  
  function createIndexDB() {
    if (!('indexedDB' in window)) {return null;} 
    return idb.open('dashboard', 1, function(upgradeDb) {
      if (!upgradeDb.objectStoreNames. contains('events')) {
        const eventsOS = upgradeDb.cr3eateObjectStore('events', {keyPath: 'id'});
      }
    });
  }
  const dbPromise = createIndexDB;

  function saveEventDataLocally(events) {
    if(!('indexedDB' in window)) {return null;}
    return dbPromise.then(db => {
      const tx = db.transaction('events', 'readwrite');
      const store = tx.objectStore('events');
      return Promise.all(events.map(event => store.put(event)))
      .catch(() => {
        tx.abort();
        throw Error('Events were not added to the store')
      })
    })
  }
  
  // const data = saveEventDataLocally(this.props)
  
  console.log('events', dbPromise().then)
  const user = this.props._user;
  if (!user) return 'You must login';
  return (
    <div className='homepage-container'>
      <div className='card-group'>
        <Map from={allBoards.where('creator', '==', `${user.uid}`)}
          Loading={() => 'Loading...'}
          Render={(props) => {
            
            return (
              <MapCard board={props} id={props._ref.id}/>
            )
          }}
          Empty={() => {
            return (
              <div>
                <small>You don't have any boards yet :{`(`}</small>
              </div>
            )
          }}
        />
      </div>
      <hr />
      {/* <button className='add-btn' onClick={() => history.push('/AddNewBoard')}>Start a new board!</button> */}
    </div>
  );
}
}
export default withAuth(HomePage);



