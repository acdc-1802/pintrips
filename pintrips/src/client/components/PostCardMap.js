import React, { Component } from 'react';
import firebase from 'firebase'
import db from '../firestore';
import { Map, withAuth } from 'fireview';
import { Image, Button, Icon } from 'semantic-ui-react';

export class PostCardMap extends Component {
  componentDidMount () {

    // https://api.mapbox.com/v4/mapbox.satellite/-76.9,38.9,5/1000x1000.jpg?access_token={your_access_token}

  }

  render () {
    return (
      <h1>PostCardMap</h1>
    )
  }
}

export default withAuth(PostCardMap)
