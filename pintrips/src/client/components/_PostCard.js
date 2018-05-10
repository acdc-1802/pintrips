import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import { withAuth } from 'fireview';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from "react-mapbox-gl";
import { Button, Icon } from 'semantic-ui-react';

require('firebase/firestore');

const PostCardMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ'
});

const solid = new Image(100, 100);
solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];

// const image = new Image(100, 100);
// image.src = '/attributes/pin.png';
// const images = ['myImage', image];

// const pintripsStyle = 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq';
// const moonLightStyle = 'mapbox://styles/destinmcmurrry/cjgycs1rn001d2rp4ss7jizyf';
// const popArtStyle = 'mapbox://styles/destinmcmurrry/cjgwv6qe1000g2rn6sy2ea8qb';
// const vintageStyle = 'mapbox://styles/destinmcmurrry/cjgwy4k6e000b2rpp80jt98o7';
// const iceCreamStyle = 'mapbox://styles/destinmcmurrry/cjgwy8chg00002spjby3ymrw8';




export class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        currentCoordinates: [40.7050191,-74.0089928],
        zoom: [8]
      }
  }

  componentDidMount() {
    const userId = this.props.withAuth.auth.currentUser.uid
    const user = db.collection("users").doc(userId)
    let self = this;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        user.set({
          currentCoordinates: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
          }, { merge: true })
        self.setState({
          currentCoordinates: [position.coords.latitude,position.coords.longitude]
        })
    }),
    (err) => console.log('error', err.message)
    }
  }

  render() {
    console.log('STATE???', this.state)
    return (
      <div className='board-container'>
      {
        this.state.currentCoordinates.length &&
        <PostCardMap
            style="mapbox://styles/mapbox/streets-v8"
            zoom={this.state.zoom}
            containerStyle={{
              height: "90vh",
              width: "90vw"
            }}
            center={this.state.currentCoordinates}>
            <ZoomControl />
            <Layer
              type='symbol'
              id='solidPins'
              layout={{ 'icon-image': 'marker-15' }}
              images={solidPins}>
            </Layer>
          </PostCardMap>
      }



        {/* <div id='menu'> */}
          {/* DOING A WEIRD THING / RENDERING LAYERS MORE THAN ONCE
          <input onChange={this.switchStyle} id='basic' type='radio' name='rtoggle' value={pintripsStyle} />
          <label htmlFor='pintrips'>pintrips</label>
          <input onChange={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={moonLightStyle} />
          <label htmlFor='moonlight'>moonlight</label>
          <input onChange={this.switchStyle} id='basic' type='radio' name='rtoggle' value={popArtStyle} />
          <label htmlFor='popArt'>pop art</label>
          <input onChange={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={vintageStyle} />
          <label htmlFor='vintage'>vintage</label>
          <input onChange={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={iceCreamStyle} />
          <label htmlFor='iceCream'>ice cream</label>
        </div> */}
        {/* <div className='footer'>
          <p id='expand-up'>—</p>
        </div> */}
      </div>
    )
  }
}

export default withAuth(PostCard)
