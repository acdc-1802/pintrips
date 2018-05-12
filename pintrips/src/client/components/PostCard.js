import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { withAuth } from 'fireview';
import { Button, Icon } from 'semantic-ui-react';
import PostCardStamp from './PostCardStamp';
import PostCardMap from './PostCardMap';
import PostCardTypeText from './PostCardTypeText';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: []
    }
  }

  componentDidMount() {
    const userId = this.props.withAuth.auth.currentUser.uid
    const user = db.collection("users").doc(userId)
    let self = this;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        user.set({
          currentCoordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
          }, { merge: true })
        self.setState({
          currentCoordinates: [position.coords.latitude,position.coords.longitude]
        })
    }),
    (err) => console.log('error', err.message)
    }
  }

  render() {
    return (
      <div className='postcard-container'>
      {
        this.state.currentCoordinates.length
        ? <div>
            {/* <PostCardStamp currentCoord={this.state.currentCoordinates}/> */}
            <PostCardMap currentCoord={this.state.currentCoordinates}/>
            <PostCardTypeText currentCoord={this.state.currentCoordinates}/>
          </div>
        : null
      }
      </div>
    )
  }
}

export default withAuth(PostCard)
