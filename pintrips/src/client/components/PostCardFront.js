import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Image, Button, Icon } from 'semantic-ui-react';
import PostCardMessage from './PostCardMessage';

require('firebase/firestore');

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      country: '',
      date: new Date().toLocaleDateString(),
      sentPostcard: false
    }
  }

  componentDidMount() {
    const latitude = this.props.currentCoord[0];
    const longitude = this.props.currentCoord[1];
    const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`)

    fetch(url)
      .then(res => res.json())
      .then(myJson => {
        this.setState({
          city: myJson.features[0].context[1].text,
          state: myJson.features[0].context[4].text,
          country: myJson.features[0].context[5].text,
          sentPostcard: true
        })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    console.log('props in front', this.props)
    const userEmail = this.props.withAuth.auth.currentUser.email
    return (
      <div className="login-container">
      <div className="postcard-container">
        <div  className='postcard-logo'>
          <img id='logo' alt='logo' src='/attributes/logo.png' />
        </div>
        <div className="stamp">
          <div className="stamp-line">{this.state.city}</div>
          <div className="stamp-line">{this.state.state}</div>
          <div className="stamp-line">{this.state.country}</div>
          <div className="stamp-line">{this.state.date}</div>
        </div>
          <Image className ="postcard-map" alt='static Mapbox map of users current location' src={`https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e/static/${this.props.currentCoord[1]},${this.props.currentCoord[0]},12,0,0/200x500?access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`} rounded/>

          <div classname="postcard-message">
            <PostCardMessage />
          </div>
        </div>
      </div>
    )
  }

}

export default withAuth(PostCard)
