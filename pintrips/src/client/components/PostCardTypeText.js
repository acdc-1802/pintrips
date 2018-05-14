import React, { Component } from 'react';
import { Map, withAuth } from 'fireview';
import { Image, Button, Icon } from 'semantic-ui-react';

export class PostCardTypeText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      country: ''
    }
  }

  componentDidMount() {
    const latitude = this.props.currentCoord[0];
    const longitude = this.props.currentCoord[1];
    console.log('latitude, longitude', latitude, longitude)
    const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`)

    fetch(url)
      .then(res => res.json())
      .then(myJson => {
        console.log('what', myJson)
        this.setState({
          city: myJson.features[0].context[1].text,
          state: myJson.features[0].context[4].text,
          country: myJson.features[0].context[5].text
        })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    console.log('props in typetext', this.state)
    return (
      <div className="postcard-typewriter-text">
        Greetings from {this.state.city}, {this.state.state}!
      </div>
    )
  }

}

export default withAuth(PostCardTypeText)
