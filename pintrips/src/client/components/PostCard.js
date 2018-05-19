import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { withAuth } from 'fireview';
import { Button } from 'semantic-ui-react';
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
    let self = this;
    const boardId = this.props.match.params.boardId;
    if (boardId) {
      db.collection('boards').doc(boardId).get()
        .then(doc => {
          self.setState({
            currentCoordinates: [doc.data().coordinates._lat, doc.data().coordinates._long],
            boardId: doc.id
          })
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      const userId = this.props.withAuth.auth.currentUser.uid
      const user = db.collection("users").doc(userId)
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          user.set({
            currentCoordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
            }, { merge: true })
          self.setState({
            currentCoordinates: [position.coords.latitude,position.coords.longitude]
          }).catch((err) => console.log('error', err.message))
        })
      }
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
      return <div className="login-container"> Loading...</div>
    return (
      <div className="login-container">
        <div className='postcard-container'>
          <div className="postcard-front"
            style={{ display: this.state.cardIsFront ? 'block' : 'none'}}>
            <PostCardMap currentCoord={this.state.currentCoordinates} boardId={this.state.boardId}/>
            <PostCardTypeText currentCoord={this.state.currentCoordinates}/>
          </div>
          <div className="postcard-back"
                style={{ display: this.state.cardIsFront ? 'none' : 'block'}}>
            <PostCardMessage currentCoord={this.state.currentCoordinates} boardId={this.state.boardId}/>
          </div>
        </div>
        <div className="postcard-flip-button">
          <Button onClick={this.rotate} compact basic color='red' size="mini">View Other Side</Button>
        </div>
        </div>
    )
  }
}

export default withAuth(PostCard)
