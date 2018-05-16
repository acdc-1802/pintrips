import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { Image } from 'semantic-ui-react';

export class PostCardMap extends Component {

  render () {
    return (
      <Image src={`https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e/static/${this.props.currentCoord[1]},${this.props.currentCoord[0]},14,0,60/700x500?access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`} className ='postcard-map' rounded/>
    )
  }
}

export default withAuth(PostCardMap)


//STATIC MAP SHOWS A 'ROCKET' PIN DROP WITHOUT ANGLE
{/* <Image src={`https://api.mapbox.com/v4/mapbox.dark/url-https%3A%2F%2Fwww.mapbox.com%2Fimg%2Frocket.png(${this.props.currentCoord[1]},${this.props.currentCoord[0]})/${this.props.currentCoord[1]},${this.props.currentCoord[0]},14/700x500.png?access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`} /> */}
