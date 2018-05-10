import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Button, Icon } from 'semantic-ui-react';

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
    console.log('state in form', this.state)
    const userEmail = this.props.withAuth.auth.currentUser.email
    return (
      <div className="login-container">
        <form className = "ui form">
          <div className="field">
            <label>To: </label>
            <input type="text" name="sendEmail" placeholder="email" />
          </div>
          <div className="field">
            <label>From: </label>
            <input type="text" name="fromEmail" placeholder={userEmail} />
          </div>
          <div className="field">
            <label>Message: </label>
            <input type="text" name="postcardBody" placeholder="Hello!" size="400"id="message-box"/>
          </div>
          {
            this.state.currentCoordinates.length &&
            <button className="ui button">Send!</button>
          }
        </form>
      </div>
    )
  }

}

export default withAuth(PostCard)
