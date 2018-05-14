import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { withAuth } from 'fireview'
import firebase from 'firebase'
import history from '../../history'
import db from '../firestore';
import PostCardStamp from './PostCardStamp';
import PostCardMap from './PostCardMap';
import PostCardTypeText from './PostCardTypeText';
import { TweenLite, Back, Bounce } from "gsap";
import PostCardMessage from './PostCardMessage';

class PostCardReceived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      receiver: '',
      sender: '',
      message: '',
      date: null,
      cardIsFront: true
    }
    this.rotate = this.rotate.bind(this)
  }

  //can be a toggle button for 'postcards' page
  //create component for received postcards
  //create component for sent postcards
  //set up noti for postcard

  componentDidMount() {
    const user = this.props._auth.currentUser.email;
    const self = this;

    user && db.collection('postcards').where('receiver', "==", user).limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          self.setState({
            currentCoordinates: doc.data().messageCoordinates,
            receiver: doc.data().receiver,
            sender: doc.data().sender,
            message: doc.data().message,
            date: doc.data().dateSent
          })
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    this.postcardAnimation();
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
    // if (!this.state.currentCoordinates.length)
    //   return <div className="login-container">loading...</div>
    const sendCoordToProps = [this.state.currentCoordinates._lat, this.state.currentCoordinates._long]
    return (
      <div className="login-container">
        <div className='postcard-container'>
          <div className="postcard-front"
            style={{ display: this.state.cardIsFront ? 'block' : 'none'}}>
            <PostCardMap currentCoord={sendCoordToProps}/>
            <PostCardTypeText currentCoord={sendCoordToProps}/>
          </div>
          <div className="postcard-back"
                style={{ display: this.state.cardIsFront ? 'none' : 'block'}}>
            <PostCardMessage currentCoord={sendCoordToProps}/>
          </div>
        </div>
        <div className="postcard-flip-button">
          <Button onClick={this.rotate} compact basic color='orange' size="mini">Flip</Button>
        </div>
        </div>
    )
  }

}

export default withAuth(PostCardReceived)
