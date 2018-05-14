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
      center: [this.props.board.coordinates._long, this.props.board.coordinates._lat],
      zoom: [0],
      boardId: this.props.id,
      pins: [],
      selectedPin: null,
      yarnCoords: []
    }
    this.handleSend = this.handleSend.bind(this);
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
          .then(() => this.setState({ pins, yarnCoords: pins.map(pin => pin.coords) }))
          .catch(error => console.error('Unable to get pins', error))
      }))
  }
  handlePinClick = pin => {
    this.setState({
      selectedPin: pin,
      center: pin.coords,
      zoom: [5]
    })
  }
  handleSend() {
    this.state.shareWith.forEach(user => {
      db.collection('users').where('username', '==', user).get()
        .then(snap => snap.forEach(doc => {
          let id = doc.data().id;
          db.collection('users').doc(id).set(
            {
              canWrite: {
                [this.state.boardId]: 'pending'
              }
            },
            { merge: true }
          )
            .catch(error => console.error('Unable to add board to user', error))
          db.collection('boards').doc(this.state.boardId).set(
            {
              readers: {
                [id]: true
              }
            },
            { merge: true }
          )
            .then(() => { this.setState({ sent: true }) })
            .then(() => { setTimeout(() => this.setState({ sent: false }), 3000) })
            .catch(error => console.error('Writer could not be added', error))
            .catch(error => console.error('Unable to send board', error))
        }))
        .catch(error => console.error('Unable to send board', error))
    })

  }

  render() {
    return (
      <div className='ind-card' id='profile-board'>
        <Card id='mapcard'>
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
