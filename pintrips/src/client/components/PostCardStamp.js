import React, { Component } from 'react';
import { Map, withAuth } from 'fireview';
import { Image, Button, Icon } from 'semantic-ui-react';

export class PostCardStamp extends Component {
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
    const userEmail = this.props.withAuth.auth.currentUser.email
    return (
      <div>
        <div className="postcard-logo-div">
          <img className='postcard-logo' alt='logo' src='/attributes/logo.png' />
        </div>
        <div className="stamp">
          <div className="stamp-line">{this.state.city}</div>
          <div className="stamp-line">{this.state.state}</div>
          <div className="stamp-line">{this.state.country}</div>
          <div className="stamp-line">{this.state.date}</div>
        </div>
      </div>
    )
  }

}

export default withAuth(PostCardStamp)
