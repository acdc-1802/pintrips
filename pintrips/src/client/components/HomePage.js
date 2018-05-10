import React from 'react';
import MapCard from './MapCard';
import db from '../firestore';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')

const HomePage = (props) => {
  const user = props._user;
  if (!user) return 'You must login';

  return (
    <div className='homepage-container'>
      <div className='card-group'>
        <Map from={allBoards.where('creator', '==', `${user.uid}`)}
          Loading={() => 'Loading...'}
          Render={(props) => {
            return (
              <MapCard board={props} id={props._ref.id} owner={true}/>
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
    </div>
  );
}

export default withAuth(HomePage);




