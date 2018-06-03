import React, { Component } from 'react';
import { withAuth } from 'fireview';

export class PostCardStamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
      date: null,
      sentPostcard: false
    }
  }

  componentWillMount() {
    if (this.props.dateSent) {
      this.setState({ date: this.props.dateSent.toString().slice(0,16)})
    } else {
      this.setState({ date: new Date().toLocaleString().slice(0,8)})
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
          place: array.slice(0,3)
        })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    return (
      <div className='stamp-logo'>
        <div className='stamp'>
          {
            this.state.place.map(aPlace => {
              return <div className='stamp-line' key={aPlace}>{aPlace}</div>
            })
          }
          <div className='stamp-line'>{this.state.date}</div>
        </div>
        <div className='stamp'>
          <img id='stamp' alt='logo' src='/attributes/stamp.png'/>
        </div>
      </div>
    )
  }

}

export default withAuth(PostCardStamp)
