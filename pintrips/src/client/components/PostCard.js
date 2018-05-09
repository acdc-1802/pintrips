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
      hello: true
    }
  }

   componentDidMount() {
    let latitude;
    let longitude;
    const userId = this.props.withAuth.auth.currentUser.uid
    const user = db.collection("users").where( "id", "==", userId )

    if ("geolocation" in navigator) {
      function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('SUCCESS', latitude, longitude)
      }
      function error() {
        console.log("Unable to retrieve your location");
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }
    this.setState({
      currentCoordinates: [latitude, longitude]
    })
    console.log('STATE', this.state.currentCoordinates)
    // this.state.currentCoordinates && user.update({
    //   currentCoordinates: new firebase.firestore.GeoPoint(this.state.currentCoordinates[0], this.state.currentCoordinates[1])
    // })
    // .then(() => {
    //   console.log("User's current location updated")
    // })
    // .catch((error) => {
    //   console.error("Error updating the current location: ", error)
    // })

    // console.log('hello', this.state.currentCoordinates)
  }

  render() {
    const current = this.state.currentCoordinates && this.state.hello
    console.log('yo', current, this.state.currentCoordinates)
    return (
      // <SingleBoard />
      <h1>here.</h1>
    )
  }
}

export default withAuth(PostCard)
