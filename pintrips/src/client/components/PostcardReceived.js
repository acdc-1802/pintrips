import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import { Dropdown, Menu, Icon, Popup, Input, Button, List, Label, Sidebar } from 'semantic-ui-react'
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
      currentCoordinates: []
    }
    this.rotate = this.rotate.bind(this)
  }

  //can be a toggle button for 'postcards' page
  //create component for received postcards
  //create component for sent postcards
  //set up noti for postcard

  componentDidMount() {
    console.log('props in postcard noti', this.props._auth.currentUser.email)
    const user = this.props._auth.currentUser.email;

    user && db.collection('postcards').where('receiver', "==", user)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          console.log(doc.data());
          // this.setState({
          //   currentCoordinates: [...this.state.currentCoordinates, [doc.messageCoordinates]]
          // })
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }

  postcardAnimation() {
    TweenLite.fromTo(".postcard-container", 3, {width:0, height:0}, {width:"80vw", height:"75vh",  ease: Bounce.easeOut});
  }

  rotate() {
    this.rotateToBack();
    this.setState({ cardIsFront: false })
  }

  rotateToBack() {
    TweenLite.to(".postcard-container", 1.2, {rotationY:180, ease:Back.easeOut});
  }

  rotateToFront() {
    TweenLite.to(".postcard-container", 1.2, {rotationY:0, ease:Back.easeOut});
  }

  render() {
    if (!this.state.currentCoordinates.length)
      return <div className="login-container">loading...</div>
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

    // render() {
    //   if (!this.state.currentCoordinates.length)
    //   return <div className="login-container">loading...</div>
    //   return (
    //     <div className="login-container">
    //       <h2>PostCardReceived Component in here</h2>
    //     </div>
    //   )
    // }

}

export default withAuth(PostCardReceived)
