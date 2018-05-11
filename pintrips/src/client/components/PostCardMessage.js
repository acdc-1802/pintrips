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
      <form className="postcard-message-body">
        <form className = "ui form">
          <div className="field">
            <label className="postcard-label">To: </label>
            <input type="text" name="sendEmail" placeholder="email" />
          </div>
          <div className="field">
            <label className="postcard-label">From: </label>
            <input type="text" name="fromEmail" placeholder={userEmail} />
          </div>
          <div className="field">
            <label className="postcard-label">Message: </label>
            <TextArea type="text" name="postcardBody" placeholder="Hello!" size="400"id="message-box" style={{ minHeight: 100 }}/>
          </div>
            <button className="ui button">Send!</button>
        </form>
      </form>
    )
  }

}

export default withAuth(PostCard)
