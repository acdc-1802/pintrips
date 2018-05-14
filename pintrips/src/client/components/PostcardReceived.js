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
    const postcardId = this.props.match.params.postcardId;
    const postcard = db.collection('postcards')
    user && postcard.doc(postcardId)
    .get()
    .then((doc) => {
      self.setState({
        currentCoordinates: [doc.data().messageCoordinates._lat, doc.data().messageCoordinates._long],
        receiver: doc.data().receiver,
        sender: doc.data().sender,
        message: doc.data().message,
        date: doc.data().dateSent
      })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }

  componentDidUpdate(prevProps, prevState) {
    TweenLite.set(".postcard-container", {transformStyle:"preserve-3d"})
    TweenLite.set(".postcard-back", {rotationY:-180})
    TweenLite.set([".postcard-back", ".postcard-front"], {backfaceVisibility:"hidden"})
  }

  // componentWillUnmount() {
  //   db.collection('postcards').where()
  // }


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
      return <div className="login-container">loading...</div>
    console.log('send coord to props', this.state.currentCoordinates)
    return (
        <div className="login-container">
          <div className='postcard-container'>
            <div className="postcard-front"
              style={{ display: this.state.cardIsFront ? 'block' : 'none'}}>
              <PostCardMap currentCoord={this.state.currentCoordinates}/>
              <PostCardTypeText currentCoord={this.state.currentCoordinates}/>
            </div>

            <div className="postcard-back"
                  style={{ display: this.state.cardIsFront ? 'none' : 'block'}}>
              <PostCardStamp currentCoord={this.state.currentCoordinates} dateSent={this.state.date}/>
              <div className="postcard-message-body" id="postcard-received">
              <div>
                To: {this.state.receiver}
              </div>
              <div>
                From: {this.state.sender}
              </div>
              <div>
                {this.state.message}
              </div>
              </div>
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
