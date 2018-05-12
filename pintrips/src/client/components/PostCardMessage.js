import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Button } from 'semantic-ui-react';
import PostCardStamp from './PostCardStamp';

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
  }

  componentDidMount() {
    this.setState({
      currentCoordinates: this.props.currentCoord
    })

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://api:key-95837e680b6d16f52f990b2f991bd651@api.mailgun.net/v3/sandboxbbf6fecad8ad4b16b09b4853fc669703.mailgun.org')
  }

  render() {
    const userEmail = this.props.withAuth.auth.currentUser.email
    return (
      <div className="postcard-message-container">
      {
        this.state.currentCoordinates.length
        ? <div>
            <div>
              <PostCardStamp currentCoord={this.state.currentCoordinates}/>
            </div>
          <div className="postcard-message-body">
            <form className="postcard-message-form">
              <div className="field">
                <label className="postcard-label">To: </label>
                <input type="text" name="receiverEmail" value={this.state.receiverEmail} onChange={this.handleChange} placeholder="email" className="postcard-form-style"/>
              </div>
              <div className="field">
                <label className="postcard-label">From: </label><input type="text" name="senderEmail" defaultValue={userEmail} placeholder={userEmail} className="postcard-form-style"/>
              </div>
              <div className="field" id="message-box">
                <label className="postcard-label">Message: </label><input type="text" name="postCardBody" value={this.state.postCardBody} onChange={this.handleChange} placeholder="Hello!" size="400" className="postcard-form-style"/>
              </div>
                <button type="submit" className="ui button">Send!</button>
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
