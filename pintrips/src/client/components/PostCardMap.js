import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Image, Button, Icon } from 'semantic-ui-react';

export class PostCardMap extends Component {

  render () {
    return (
      <Image src={`https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e/static/${this.props.currentCoord[1]},${this.props.currentCoord[0]},13,0,60/700x500?access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`} className ="postcard-map" rounded/>

    )
  }
}

export default withAuth(PostCardMap)
