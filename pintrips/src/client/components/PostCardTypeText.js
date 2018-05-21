import React, { Component } from 'react';
import { withAuth } from 'fireview';

export class PostCardTypeText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: []
    }
  }

  componentDidMount() {
    const latitude = this.props.currentCoord[0];
    const longitude = this.props.currentCoord[1];
    const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`)

    fetch(url)
      .then(res => res.json())
      .then(myJson => {
        const array = [];
        myJson.features[0].context.forEach(place => {
          array.push(place.text)
        })
        this.setState({
          place: array.slice(0,2)
        })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    return (
      <div className="postcard-typewriter-text">
        Greetings from&nbsp;
        {
          this.state.place.join(' ')
        }
        !
      </div>

    )
  }

}

export default withAuth(PostCardTypeText)
