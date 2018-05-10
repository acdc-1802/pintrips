import React from 'react';
import MapCard from './MapCard';
import db from '../firestore';
import { Map, withAuth } from 'fireview';

const allBoards = db.collection('boards')

const HomePage = (props) => {
  const user = props._user;
  if (!user) return 'You must login';

  //offline caching
  db.collection('boards')
  .onSnapshot({ includeQueryMetadataChanges: true }, function(snapshot) {
    snapshot.docChanges.forEach(function(change) {
        if (change.type === "added") {
            // console.log("New Board: ", change.doc.data());
        }

        var source = snapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source);
    });
  });

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




