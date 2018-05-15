import React, {Component} from 'react';
import MapCard from './MapCard';
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import firebase from 'firebase';

const allBoards = db.collection('boards')

class HomePage extends Component{ 
  componentDidMount(){
    const userId = this.props.withAuth.auth.currentUser.uid;
    const user = db.collection("users").doc(userId);
    if(navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function(position) {
        user.set({
          currentCoordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
          }, { merge: true })
          .catch(err => console.log('error', err.message))
      })
    }
  }
  render(){
    const user = this.props._user;
    if (!user) return 'You must login';
  
    return (
      <div className='homepage-container'>
        <div className='card-group'>
          <Map from={allBoards.where('creator', '==', `${user.uid}`)}
            Loading={() => 'Loading...'}
            Render={(props) => {
              if(props.name !== 'world'){
                return (
                  <MapCard board={props} id={props._ref.id} userId={user.uid} owner={true}/>
                )
              } else {
                return ('')
              }
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
}

export default withAuth(HomePage);




