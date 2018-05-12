import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      city: '',
      state: '',
      country: '',
      date: new Date().toLocaleDateString(),
      sentPostcard: false
    }
  }

  render() {
    const userEmail = this.props.withAuth.auth.currentUser.email
    return (
      <div className="postcard-message-body">
        <form className = "postcard-form">
          <div className="field">
            <label className="postcard-label">To: </label>
            <input type="text" name="sendEmail" placeholder="email" className="postcard-form-style"/>
          </div>
          <div className="field">
            <label className="postcard-label">From: </label><input type="text" name="fromEmail" placeholder={userEmail} className="postcard-form-style"/>
          </div>
          <div className="field">
            <label className="postcard-label">Message: </label><input type="text" name="postcardBody" placeholder="Hello!" size="400"id="message-box" className="postcard-form-style"/>
          </div>
            <button className="ui button">Send!</button>
        </form>
      </div>
    )
  }

}

export default withAuth(PostCard)
