import React, { Component } from 'react';
import { Button, Card, Icon, Checkbox, Segment, Label, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import db from '../firestore';
import history from '../../history';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

const solid = new Image(75, 75);
solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];

const linePaint = {
  'line-color': '#a11823',
  'line-width': 1
};

class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [-74.009464, 40.705089],
      zoom: [0],
      pins: [],
      selectedPin: null,
      yarnCoords: []
    }
  }


  componentDidMount() {
    let pins = []
    db.collection('boards').where('creator', '==', `${this.props.userId}`).get()
      .then(snapshot => snapshot.forEach(doc => {
        db.collection('boards').doc(doc.id).collection('pins').get()
          .then(allPins => allPins.forEach(doc => {
            if (doc.data().visited) {
              pins.push({
                label: doc.data().label,
                coords: [doc.data().coordinates._long, doc.data().coordinates._lat],
                pinId: doc.id,
                visited: doc.data().visited
              })
            }
          }))
          .catch(error => console.error('Unable to get pins', error))
      }))
      .then(() => {
        db.collection('boards').get()
          .then(snapshot => snapshot.forEach(doc => {
            if(doc.data().writers) {
              if (doc.data().writers[this.props.userId]){
                db.collection('boards').doc(doc.id).collection('pins').get()
                .then(allPins => allPins.forEach(doc => {
                  if (doc.data().visited) {
                    pins.push({
                      label: doc.data().label,
                        coords: [doc.data().coordinates._long, doc.data().coordinates._lat],
                        pinId: doc.id,
                        visited: doc.data().visited
                    })
                  }
                }))
                .then(() => this.setState({ pins, yarnCoords: pins.map(pin => pin.coords) }))
                .catch(error => console.log('unable to add shared pins', error))
              }
            }
          }))
          .catch(error => console.error('Unable to get pins from shared boards', error))
      })
      .catch(error => console.error('Unable to get pins', error))
  }
  handlePinClick = pin => {
    this.setState({
      selectedPin: pin,
      center: pin.coords,
      zoom: [5]
    })
  }

  render() {
    return (
      <div className='ind-card' id='profile-board'>
        <Card id='mapcard-world'>
          <Map
            style={'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq'}
            zoom={this.state.zoom}
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={this.state.center}
          >
            <ZoomControl id='zoom-btn' position='top-right' />
            <Layer
              type='symbol'
              id='solidPins'
              layout={{ 'icon-image': 'solidImage', 'icon-allow-overlap': true }}
              images={solidPins}>
              {this.state.pins &&
                this.state.pins.map(pin => {
                  return (
                    <Feature
                      key={pin.label}
                      coordinates={pin.coords}
                      onClick={this.handlePinClick.bind(this, pin)}
                    />
                  )
                }
                )
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
          </Map>
        </Card>
      </div>
    );
  }
}

export default WorldMap;
