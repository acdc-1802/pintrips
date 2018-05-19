import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { withAuth } from 'fireview';
import { Button } from 'semantic-ui-react';
import PostCardStamp from './PostCardStamp';
import history from '../../history';
import * as emailjs from 'emailjs-com';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      receiverEmail: '',
      postCardBody: '',
      senderEmail: '',
      postcardId: null
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
    const postcards = db.collection('postcards')
    postcards.add({
      dateSent: new Date().toString(),
      message: this.state.postCardBody,
      messageCoordinates: new firebase.firestore.GeoPoint(this.state.currentCoordinates[0], this.state.currentCoordinates[1]),
      opened: false,
      receiver: this.state.receiverEmail,
      sender: this.state.senderEmail,
      boardId: this.props.boardId
    })
    .then(created => {
      this.setState({ postcardId: created.id})
      const templateParams = { to_name: this.state.receiverEmail, from_name: this.state.senderEmail, postcard_id: this.state.postcardId }
      emailjs.send('default_service', 'pintrips_postcard', templateParams, 'user_y9Gpr6VKiWp0BpC5djRDe')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(err) {
            console.log('FAILED...', err);
        });
    })
    .then(res => {
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
              <PostCardStamp currentCoord={this.state.currentCoordinates}/>
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
