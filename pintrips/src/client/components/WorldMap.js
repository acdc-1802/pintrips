import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import db from '../firestore';
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";

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
      center: [15, 32],
      zoom: [.95],
      pins: [],
      selectedPin: null,
      yarnCoords: [],
      style: 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq'
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
      center: pin.coords
    })
  }

  render() {
    return (
      <div className='ind-card' id='profile-board'>
        <Card id='mapcard-world'>
          <Map
            style={this.state.style}
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
              this.state.selectedPin &&
              <Popup
                className='popup-label'
                key={this.state.selectedPin.label}
                coordinates={this.state.selectedPin.coords}
                offset={50}
              >
                <div className='options-container'>
                  <button onClick={() => this.setState({ selectedPin: null })} className='x-btn' id='close-popup'>x</button>
                </div>
                <div>
                  <h4 id='label'>{this.state.selectedPin.label}</h4>
                  {
                    this.state.selectedPin.notes && <small id='notes'>{this.state.selectedPin.notes}</small>
                  }
                </div>
              </Popup>
            }
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
