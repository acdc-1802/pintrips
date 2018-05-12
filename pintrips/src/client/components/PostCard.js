import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { withAuth } from 'fireview';
import { Button, Icon } from 'semantic-ui-react';
import PostCardStamp from './PostCardStamp';
import PostCardMap from './PostCardMap';
import PostCardTypeText from './PostCardTypeText';
import { TweenLite, Back, Bounce } from "gsap";
import PostCardMessage from './PostCardMessage';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      cardIsFront: true
    }
    this.rotate = this.rotate.bind(this)
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

  componentDidUpdate(prevProps, prevState) {
    TweenLite.set(".postcard-container", {transformStyle:"preserve-3d"})
    TweenLite.set(".postcard-back", {rotationY:-180})
    TweenLite.set([".postcard-back", ".postcard-front"], {backfaceVisibility:"hidden"})
  }

  postcardAnimation() {
    TweenLite.fromTo(".postcard-container", 3, {width:0, height:0}, {width:"80vw", height:"75vh",  ease: Bounce.easeOut});
  }

  rotate() {
      if (this.state.cardIsFront) {
      this.rotateToBack();
    } else {
      this.rotateToFront();
    }
    this.setState({ cardIsFront: !this.state.cardIsFront })
  }

  rotateToBack() {
    TweenLite.to(".postcard-container", 1.2, {rotationY:180, ease:Back.easeOut});
  }

  rotateToFront() {
    TweenLite.to(".postcard-container", 1.2, {rotationY:0, ease:Back.easeOut});
  }

  render() {
    if (!this.state.currentCoordinates.length)
      return <div>loading...</div>
    return (
        <div className='postcard-container' onClick={this.rotate}>
          <div className="postcard-front"
            style={{ display: this.state.cardIsFront ? 'block' : 'none'}}>
            <PostCardMap currentCoord={this.state.currentCoordinates}/>
            <PostCardTypeText currentCoord={this.state.currentCoordinates}/>
          </div>
          <div className="postcard-back"
                style={{ display: this.state.cardIsFront ? 'none' : 'block'}}>
            <PostCardMessage currentCoord={this.state.currentCoordinates}/>
          </div>
        </div>
    )
  }
}

export default withAuth(PostCard)
