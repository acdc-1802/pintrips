import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MapCard from './MapCard';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')

const SharedWithMe = (props) => {
  
  const user = props._user;
  if (!user) return 'Please login';

  return (
    <div className='homepage-container'>
      <div className='card-group'>
        <Map from={allBoards.where(`writers.${user.uid}`, '==', true)}
          Loading={() => 'Loading...'}
          Render={(props) => {
            return (
              <MapCard board={props} id={props._ref.id}/>
            )
          }}
          Empty={() => {
            return (
              <div>
                <small>You don't have any boards shared with you yet :{`(`}</small>
              </div>
            )
          }}
        />
      </div>
      <hr />
      <button className='add-btn' onClick={() => history.push('/AddNewBoard')}>Start a new board!</button>
    </div>
  );
}

export default withAuth(SharedWithMe);




