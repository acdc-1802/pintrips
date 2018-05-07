import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import MapCard from './MapCard';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')

const HomePage = (props) => {

  const user = props._user;
  if (!user) return 'You must login';

  return (
    <div>
      <div className='card-group'>
        <Map from={allBoards.where('creator', '==', `${user.uid}`)}
          Loading={() => 'Loading...'}
          Render={(props) => {
            return (
              <Link to={`SingleBoard/${props._ref.id}`}><MapCard board={props} /></Link>
            )
          }}
          Empty={() => <small>You don't have any boards yet :{`(`}</small>}
        />
        <hr />
        <button onClick={() => history.push('/AddNewBoard')}>Start a new board!</button>
      </div>
    </div>
  );
}

export default withAuth(HomePage);




