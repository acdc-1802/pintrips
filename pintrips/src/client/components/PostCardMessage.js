import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Button } from 'semantic-ui-react';
import PostCardStamp from './PostCardStamp';
import history from '../../history';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      receiverEmail: '',
      postCardBody: '',
      senderEmail: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      currentCoordinates: this.props.currentCoord,
      senderEmail: this.props.withAuth.auth.currentUser.email
    })

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e, userEmail) {
    e.preventDefault();
    // fetch('https://api:key-95837e680b6d16f52f990b2f991bd651@api.mailgun.net/v3/sandboxbbf6fecad8ad4b16b09b4853fc669703.mailgun.org')

    const postcards = db.collection('postcards')
    postcards.add({
      dateSent: new Date(),
      message: this.state.postCardBody,
      messageCoordinates: new firebase.firestore.GeoPoint(this.state.currentCoordinates[0], this.state.currentCoordinates[1]),
      opened: false,
      receiver: this.state.receiverEmail,
      sender: this.state.senderEmail
    })
    .then(function() {
      history.push('/postcard_sent')
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        history.pushState('/404')
    });

  }

  render() {
    const userEmail = this.state.senderEmail
    const { receiverEmail, postCardBody } = this.state;
    const isEnabled =
      receiverEmail.length > 0 &&
      postCardBody.length > 0;

    return (
      <div className="postcard-message-container">
      {
        this.state.currentCoordinates.length
        ? <div>
            <div>
              <PostCardStamp currentCoord={this.state.currentCoordinates}/>
            </div>
            <div className="postcard-message-body">
              <form className="postcard-message-form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="postcard-label">To: </label><input type="text" name="receiverEmail" value={this.state.receiverEmail} onChange={this.handleChange} placeholder="email" className="postcard-form-style"/>
                </div>
                <div className="field">
                  <label className="postcard-label">From: </label><input type="text" name="senderEmail" readOnly={userEmail} placeholder={userEmail} className="postcard-form-style"/>
                </div>
                <div className="field" id="message-box">
                  <label className="postcard-label">Message: </label><textarea type="text" name="postCardBody" value={this.state.postCardBody} onChange={this.handleChange} placeholder="Hello!" className="postcard-form-style" id="textarea"></textarea>
                </div>
                  <Button type="submit" color='teal' compact disabled={!isEnabled}>Send!</Button>
              </form>
            </div>
          </div>
      : null
      }
      </div>
    )
  }

}

export default withAuth(PostCard)
