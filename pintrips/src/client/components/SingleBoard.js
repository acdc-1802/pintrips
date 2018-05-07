import React, { Component } from 'react';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from "react-mapbox-gl";
import LocationSearch from './LocationSearch';
import db from '../firestore';
import firebase from 'firebase';
import { withAuth } from 'fireview';
import history from '../../history';
import { Button, Icon } from 'semantic-ui-react';
require('firebase/firestore');

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

const image = new Image(100, 100);
image.src = '/attributes/pin.png';
const images = ['myImage', image];

class SingleBoard extends Component {

  state = {
    pins: [],
    newPin: {},
    center: [-74.006376, 40.712368],
    selectedPin: null,
    zoom: [12]
  }

  componentWillMount() {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).get()
      .then(doc => {
        let board = doc.data()
        return board;
      })
      .then(thisBoard => {
        this.setState({
          center: [thisBoard.coordinates._long, thisBoard.coordinates._lat]
        })
      })
      .catch(err => console.error(err));

    const pinCoordsArr = [];
    db.collection('boards').doc(boardId).collection('pins').get()
      .then(thesePins => thesePins.forEach(pin => {
        pinCoordsArr.push({
          label: pin.data().label, coords: [pin.data().coordinates._long, pin.data().coordinates._lat], pinId: pin.id
        })
      }))
      .then(() => this.setState({
        pins: pinCoordsArr
      }));
  }

  selectLocation = (label, coords) => {
    this.setState({
      newPin: { label, coords }
    })
  }

  submitPin = () => {
    const boardId = this.props.match.params.boardId;
    this.state.newPin && this.state.newPin.coords &&
      db.collection('boards').doc(boardId).collection('pins').add({
        label: this.state.newPin.label,
        coordinates: new firebase.firestore.GeoPoint(this.state.newPin.coords[0], this.state.newPin.coords[1]),
        visited: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(() => {
          this.setState({ newPin: {} });
          // window.location.href(`/SingleBoard/${boardId}`);
        })
  }

  markerClick = pin => {
    this.setState({
      selectedPin: pin,
      center: pin.coords,
      zoom: [17]
    })
  }

  handleDelete = pinId => {
    const boardId = this.props.match.params.boardId;
    console.log(`board id: ${boardId} and pin id: ${pinId}`)
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).delete()
      .then(() => {
        console.log('Pin successfully deleted')
      })
      // .then(() => history.push(`/SingleBoard/${boardId}`))
      .catch(err => console.error('Delete unsuccessful: ', err))
  }

  render() {
    return (
      <div className='board-container'>
        <Map
          style='mapbox://styles/destinmcmurrry/cjgwoclek000a2sr3cwgutpdg'
          zoom={this.state.zoom}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={this.state.center}>
          <ZoomControl />
          <Layer
            type='symbol'
            id='pins'
            layout={{ 'icon-image': 'myImage' }}
            images={images}>
            {this.state.pins &&
              this.state.pins.map(pin => {
                return (
                  <Feature
                    key={pin.label}
                    coordinates={pin.coords}
                    onClick={this.markerClick.bind(this, pin)}
                  />
                )
              }
              )
            }
          </Layer>
          {
            this.state.selectedPin && (
              <Popup
                key={this.state.selectedPin.label}
                coordinates={this.state.selectedPin.coords}
              >
                <div>
                  <div>{this.state.selectedPin.label}</div>
                    <Button color='red' floated='right' size='mini' content={<Icon name='trash outline' size='large' fitted={true} />} onClick={()=> (<Button onClick={this.handleDelete(this.state.selectedPin.pinId)} />)}/>
                  </div>
              </Popup>
            )
          }
        </Map>
        <div className='search-container'>
          <div className='search-coords'>
            <div>
              <LocationSearch forAddPin={true} updateBoardPins={this.selectLocation} />
            </div>
            <button onClick={this.submitPin} type="submit">ADD NEW PIN</button>
          </div>
        </div>
        <div className='footer'>
          <p id='expand-up'>—</p>
        </div>
      </div>
    )
  }
}

export default withAuth(SingleBoard);
