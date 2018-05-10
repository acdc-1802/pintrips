import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import { Map, withAuth } from 'fireview';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from "react-mapbox-gl";
import { Button, Icon } from 'semantic-ui-react';
import SingleBoard from './SingleBoard';

require('firebase/firestore');

// const Map = ReactMapboxGl({
//   accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
// });

const image = new Image(100, 100);
image.src = '/attributes/pin.png';
const images = ['myImage', image];

const pintripsStyle = 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq';
const moonLightStyle = 'mapbox://styles/destinmcmurrry/cjgycs1rn001d2rp4ss7jizyf';
const popArtStyle = 'mapbox://styles/destinmcmurrry/cjgwv6qe1000g2rn6sy2ea8qb';
const vintageStyle = 'mapbox://styles/destinmcmurrry/cjgwy4k6e000b2rpp80jt98o7';
const iceCreamStyle = 'mapbox://styles/destinmcmurrry/cjgwy8chg00002spjby3ymrw8';


export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      city: '',
      state: '',
      country: '',
      date: new Date().toLocaleDateString(),
      sentPostcard: false,
      addStamp: false
    }
  }

  componentDidMount() {
    const userId = this.props.withAuth.auth.currentUser.uid
    const user = db.collection("users").doc(userId)
    let self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      user.set({
        currentCoordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
        }, { merge: true })
      self.setState({
        currentCoordinates: [position.coords.latitude, position.coords.longitude]
      });
    },
      (err) => alert(err.message)
    );
  }

  addStamp() {
    const latitude = this.state.currentCoordinates[0];
    const longitude = this.state.currentCoordinates[1]
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

      this.setState({ addStamp: true })
  }

  render() {
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
          <button className="ui button" onClick={this.addStamp.bind(this)}>Add a stamp and Send!</button>
        </form>
        {
          this.state.addStamp
          ? <div className="stamp">
              <div>{this.state.city}</div>
              <div>{this.state.state}</div>
              <div>{this.state.country}</div>
              <div>{this.state.date}</div>
            </div>
          : null
        }
      </div>
    )
  }

}

export default withAuth(PostCard)
