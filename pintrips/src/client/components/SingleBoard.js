import React, { Component } from 'react';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from 'react-mapbox-gl';
import LocationSearch from './LocationSearch';
import db from '../firestore';
import firebase from 'firebase';
import { withAuth } from 'fireview';
import history from '../../history';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
require('firebase/firestore');

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

const solid = new Image(100, 100);
solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];

const hollow = new Image(100, 100);
hollow.src = '/attributes/hollowPin.png';
const hollowPins = ['hollowImage', hollow];

const linePaint = {
  'line-color': '#a11823',
  'line-width': 3
};

const pintripsStyle = 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq';
const moonLightStyle = 'mapbox://styles/destinmcmurrry/cjgycs1rn001d2rp4ss7jizyf';
const vintageStyle = 'mapbox://styles/destinmcmurrry/cjgwy4k6e000b2rpp80jt98o7';

class SingleBoard extends Component {
  state = {
    center: [-74.006376, 40.712368],
    zoom: [12],
    style: pintripsStyle, // will later be grabbed from user preference on db
    title: '',
    visitedPins: [],
    unvisitedPins: [],
    yarnCoords: [],
    selectedPin: null,
    newLocation: null,
    needsTimestamp: false,
    showLabel: false,
    newLabel: '',
    newNotes: '',
    openStatus: '',
    editingMode: false
  }

  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    // get center of board
    db.collection('boards').doc(boardId).get()
      .then(doc => {
        let board = doc.data()
        return board;
      })
      .then(thisBoard => {
        this.setState({
          center: [thisBoard.coordinates._long, thisBoard.coordinates._lat],
          openStatus: thisBoard.locked,
          style: thisBoard.style,
          title: thisBoard.name
        })
      })
      .catch(err => {
        console.error(err);
        history.push('/404');
      }).then(() => {
        db.collection('boards').doc(boardId).collection('pins').orderBy('visited')
          .onSnapshot((querySnapshot) => {
            const visitedPins = [];
            const unvisitedPins = [];
            querySnapshot.forEach(doc => {
              const pin = doc.data();
              if (pin.visited) {
                visitedPins.push({
                  label: pin.label,
                  notes: pin.notes,
                  coords: [pin.coordinates._long, pin.coordinates._lat],
                  pinId: doc.id,
                  visited: pin.visited
                })
              } else {
                unvisitedPins.push({
                  label: pin.label,
                  notes: pin.notes,
                  coords: [pin.coordinates._long, pin.coordinates._lat],
                  pinId: doc.id,
                  visited: pin.visited
                })
              }
            })
            this.setState({
              visitedPins,
              unvisitedPins,
              yarnCoords: visitedPins.map(pin => pin.coords)
            })
          })
      })
      .catch(error => console.error('Unable to set state', error))
  }

  switchStyle = event => {
    const boardId = this.props.match.params.boardId;
    this.setState({
      style: event.target.value
    });
    db.collection('boards').doc(boardId).update(
      {
        style: event.target.value
      }
    )
    .catch(error => console.error('Unable to update board style', error))
  }

  selectPlaceFromSearchBar = (label, coords) => {
    this.setState({
      newLabel: label,
      newLocation: [coords[1], coords[0]]
    })
  }

  _onClickMap(map, evt) {
    this.setState({
      newLocation: [evt.lngLat.lng, evt.lngLat.lat],
      selectedPin: null
    })
  }

  handleShowLabel = visited => {
    if (visited) {
      this.setState({
        needsTimestamp: true
      })
    }
    this.setState({
      showLabel: true
    })
  }

  handlePinChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handlePinAdd = () => {
    let visitedValue = null;
    if (this.state.needsTimestamp) visitedValue = firebase.firestore.FieldValue.serverTimestamp();
    const boardId = this.props.match.params.boardId;
    this.state.newLabel && this.state.newLocation &&
      db.collection('boards').doc(boardId).collection('pins').add({
        label: this.state.newLabel,
        notes: this.state.newNotes,
        coordinates: new firebase.firestore.GeoPoint(this.state.newLocation[1], this.state.newLocation[0]),
        visited: visitedValue
      })
        .then(() => {
          this.setState({ newLocation: null, newLabel: '', newNotes: '', showLabel: null, needsTimestamp: false });
          console.log('Pin successfully added');
        })
        .catch((err) => console.error('Add unsuccessful: ', err))
    db.collection('boards').doc(boardId).update({
      coordinates: new firebase.firestore.GeoPoint(this.state.newLocation[1], this.state.newLocation[0])
    })
      .catch(error => console.error('Unable to update center of board', error))
  }

  toggleEditingMode = () => {
    if (this.state.selectedPin.label) {
      this.setState({ newLabel: this.state.selectedPin.label })
    }
    if (this.state.selectedPin.notes) {
      this.setState({ newNotes: this.state.selectedPin.notes })
    }
    this.setState({ editingMode: !this.state.editingMode });
  }

  updatePin = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
      {
        label: this.state.newLabel,
        notes: this.state.newNotes
      }
    )
    .then(() => this.setState({ newLabel: '', newNotes: '', showLabel: null, editingMode: false, selectedPin: null }))
    // why why why why why doesn't it re-render with new info
    // right now just setting selected pin to null
    .catch(err => console.error('Unable to change label', err))
  }

  handlePinClick = pin => {
    this.setState({
      selectedPin: pin,
      center: pin.coords,
      zoom: [12.5],
      newLocation: null
    })
  }

  toggleVisited = pinId => {
    const boardId = this.props.match.params.boardId;
    if (this.state.selectedPin.visited) {
      db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
        {
          visited: null,
        }
      )
      .catch(error => console.error('Unable to unmark pin', error))
    } else {
      db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
        {
          visited: firebase.firestore.FieldValue.serverTimestamp()
        }
      )
      .catch(error => console.error('Unable to mark as visited', error))
    }
    this.setState({
      selectedPin: null,
      zoom: [12.3],
      editingMode: false,
      newLabel: '',
      newNotes: ''
    })
  }

  handlePinDelete = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).delete()
      .then(() => {
        console.log('Pin successfully deleted')
      })
      .then(() => {
        this.setState({ selectedPin: null, zoom: [12.3], editingMode: false, newLabel: '', newNotes: '' })
      })
      .catch(err => console.error('Delete unsuccessful: ', err))
  }

  render() {

    return (
      <div className='board-container'>
        <Map
          style={this.state.style}
          zoom={this.state.zoom}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          onClick={this._onClickMap.bind(this)}
          center={this.state.center}>
          <ZoomControl id='zoom-btn' position='top-right' />
          <Layer
            type='symbol'
            id='solidPins'
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
          <Layer
            type='symbol'
            id='hollowPins'
            layout={{ 'icon-image': 'hollowImage' }}
            images={hollowPins}>
            {this.state.unvisitedPins &&
              this.state.unvisitedPins.map(pin => {
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
            this.state.selectedPin && !this.state.editingMode &&
            // popup for existing pin label and notes
            <Popup
              className='popup-label'
              key={this.state.selectedPin.label}
              coordinates={this.state.selectedPin.coords}
              offset={50}
            >
              <div className='options-container'>
                <button onClick={() => this.setState({ selectedPin: null, zoom: [12.5], newLocation: null, editingMode: false })} className='x-btn' id='close-popup'>x</button>
                {
                  this.state.openStatus === 'open' &&
                  <Icon id='edit-btn' name='edit' size='large' fitted={true} onClick={() => (<Button onClick={this.toggleEditingMode()} />)} />
                }
              </div>
              <div>
                <h4 id='label'>{this.state.selectedPin.label}</h4>
                {
                  // would like truncated and the ... when clicked to show full notes
                  this.state.selectedPin.notes && <small id='notes'>{this.state.selectedPin.notes}</small>
                }
              </div>
            </Popup>
          }
          {
            this.state.selectedPin && this.state.editingMode &&
            // editing mode for existing pin label and notes
            <Popup
              key={this.state.selectedPin.label + '-edit'}
              coordinates={this.state.selectedPin.coords}
              offset={50}
            >
              <div className='options-container'>
                <Icon id='chevron' name='chevron left' size='large' fitted={true} onClick={() => (<Button onClick={this.toggleEditingMode()} />)} />
                <Icon id='add-pin' name='checkmark' size='large' fitted={true} onClick={() => (<Button onClick={this.updatePin(this.state.selectedPin.pinId)} />)} />
              </div>
              <div id='add-pin-options'>
                <p>Label:</p>
                <input type='text' name='newLabel' maxLength='20' value={this.state.newLabel} onChange={this.handlePinChange} />
                <p>Notes:</p>
                <textarea id='notes-input' type='text' maxLength='150' name='newNotes' value={this.state.newNotes} onChange={this.handlePinChange} />
                <div id='pin-trash-btns'>
                {
                  this.state.openStatus === 'open' &&
                  <Icon name='thumb tack' size='large' fitted={true} onClick={() => (<Button onClick={this.toggleVisited(this.state.selectedPin.pinId)} />)} />
                }
                {
                  this.state.openStatus === 'open' &&
                  <Icon name='trash outline' color='red' size='large' fitted={true} onClick={() => this.handlePinDelete(this.state.selectedPin.pinId)} />
                }
                </div>
              </div>
            </Popup>
          }
          {
            this.state.newLocation && this.state.openStatus === 'open' && (
              !this.state.showLabel
                ?
                // popup for adding pin - choose type
                (
                  <Popup
                    coordinates={this.state.newLocation}
                  >
                    <button onClick={() => this.setState({ selectedPin: null, zoom: [12.5], newLocation: null })} className='x-btn' id='close-popup-add-pin'>x</button>
                    <div id='pin-options'>
                      <p>Want to put a pin in it?</p>
                      <button onClick={() => this.handleShowLabel(false)}><img alt='hollow-pin' src='/attributes/hollowPinOption.png' /></button>
                      <button onClick={() => this.handleShowLabel(true)}><img alt='pin' src='/attributes/pinOption.png' /></button>
                      <div>
                        <span id='want-to-go'>plan</span>
                        <span id='here-now'>journal</span>
                      </div>
                    </div>
                  </Popup>)
                :
                (
                  // popup for adding pin - add label and notes
                  <Popup
                    coordinates={this.state.newLocation}
                  >
                    <div>
                      <div className='options-container'>
                        <button id='close-popup' onClick={() => this.setState({ showLabel: null })}><i class='chevron left icon'></i></button>
                        <button id='add-pin' onClick={this.handlePinAdd}><i class="plus icon"></i></button>
                      </div>
                      <div id='edit-pin-options'>
                        <p>Label:</p><input type='text' name='newLabel' placeholder='ex: Best Ice Cream!' maxLength='20' value={this.state.newLabel} onChange={this.handlePinChange} />
                        <p>Notes:</p>
                        <textarea id='notes-input' type='text' name='newNotes' placeholder='ex: saw this on a blog, and they have so many toppings' maxLength='150' value={this.state.newNotes} onChange={this.handlePinChange} />
                      </div>
                    </div>
                  </Popup>)
            )
          }
        </Map>

        <div id='back-btn'>
          <Button circular icon='chevron left' color='grey' onClick={history.goBack}/>
        </div>

        <div id='footer'>
          <Dropdown className="settings" icon="settings" upward >
            <Dropdown.Menu>
              <Button.Group basic vertical>
                <Dropdown.Item>
                    <Button basic content= "Pintrips Style" onClick={this.switchStyle} id='basic' type='radio' name='rtoggle' value={pintripsStyle} />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button basic content=' Moonlight' onClick={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={moonLightStyle} />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button basic content='Vintage' onClick={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={vintageStyle} />
                  </Dropdown.Item>
                </Button.Group>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div id='map-search-bar'>
          <LocationSearch
            value={this.state.title}
            className="search-bar"
            forAddPin={true}
            updateBoardPins={this.selectPlaceFromSearchBar}>
          <input placeholder="Search in "/>
          </LocationSearch>
        </div>

      </div>
    )
  }
}
export default withAuth(SingleBoard);
