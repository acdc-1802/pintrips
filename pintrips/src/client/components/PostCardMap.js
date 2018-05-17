import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import db from '../firestore';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ'
});

const solid = new Image(75, 75);
solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];


const linePaint = {
  'line-color': '#a11823',
  'line-width': 1
};

export class PostCardMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [],
      visitedPins: [],
      yarnCoords: [],
      selectedPin: null,
      style: 'mapbox://styles/cilavery/cjh9g0z111ibf2sqxyqx1nhas'
    }
  }

  componentDidMount() {
    const boardId = this.props.boardId
    const lat = this.props.currentCoord[0]
    const long = this.props.currentCoord[1]
    this.setState({
      center: [long, lat]
    })

    db.collection('boards').doc(boardId).collection('pins').orderBy('visited')
      .onSnapshot((querySnapshot) => {
        const visitedPins = [];
        querySnapshot.forEach(doc => {
          const pin = doc.data();
          visitedPins.push({
            label: pin.label,
            notes: pin.notes,
            coords: [pin.coordinates._long, pin.coordinates._lat],
            pinId: doc.id,
            visited: pin.visited
          })
        })
        this.setState({
          visitedPins,
          yarnCoords: visitedPins.map(pin => pin.coords)
        })
      })
  }

  handlePinClick = pin => {
    this.setState({
      selectedPin: pin,
      center: pin.coords
    })
  }

  render() {

    return (
      <div className='postcard-map-sizing'>
        {
          this.state.center.length &&
            <Map
              style={this.state.style}
              containerStyle={{
                height: '500px',
                width: '700px'
              }}
              center={this.state.center}
              pitch={[60]}
            >
              <Layer
                type='symbol'
                id='postcardPins'
                layout={{ 'icon-image': 'solidImage', 'icon-allow-overlap': true }}
                images={solidPins}>
                {this.state.visitedPins &&
                  this.state.visitedPins.map(pin => {
                    return (
                      <Feature
                        key={pin.label}
                        coordinates={pin.coords}
                        onClick={this.handlePinClick.bind(this, pin)}
                      />
                    )
                  })
                }
              </Layer>
              {
              this.state.yarnCoords.length > 1 &&
              <Layer
                type='line'
                id='yarn'
                paint={linePaint}>
                <Feature
                  coordinates={this.state.yarnCoords}
                  offset={25}
                />
              </Layer>
              }
              {
              this.state.selectedPin &&
              <Popup
                className='popup-label'
                key={this.state.selectedPin.label}
                coordinates={this.state.selectedPin.coords}
                offset={50}
              >
                <div>
                  <h4 id='label'>{this.state.selectedPin.label}</h4>
                  {
                    this.state.selectedPin.notes &&
                      <small id='notes'>{this.state.selectedPin.notes}</small>
                  }
                </div>
              </Popup>
              }
            </Map>
        }
      </div>
    )
  }
}

export default PostCardMap


