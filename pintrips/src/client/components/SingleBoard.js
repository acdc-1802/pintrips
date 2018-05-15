import React, { Component } from 'react';
import ReactMapboxGl, { Popup, Layer, Feature, ZoomControl } from "react-mapbox-gl";
import LocationSearch from './LocationSearch';
import db from '../firestore';
import firebase from 'firebase';
import { withAuth } from 'fireview';
import history from '../../history';
import { Button, Card, Dropdown, Icon, Input, Checkbox, Segment, Label, Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
    visitedPins: [],
    unvisitedPins: [],
    yarnCoords: [],
    selectedPin: null,
    newLocation: null,
    needsTimestamp: false,
    showLabel: null,
    newLabel: '',
    openStatus: '',
    editLabel: false
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
          style: thisBoard.style
        })
      })
      .catch(err => {
        console.error(err);
        history.push('/404');
      });
    // get all pins from board, organize by visited/unvisited
    db.collection('boards').doc(boardId).collection('pins').orderBy('visited')
      .onSnapshot((querySnapshot) => {
        const visitedPins = [];
        const unvisitedPins = [];
        querySnapshot.forEach(doc => {
          const pin = doc.data();
          if (pin.visited) {
            visitedPins.push({
              label: pin.label,
              coords: [pin.coordinates._long, pin.coordinates._lat],
              pinId: doc.id,
              visited: pin.visited
            })
          } else {
            unvisitedPins.push({
              label: pin.label,
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
      });
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

  handleLabelChange = event => {
    this.setState({
      newLabel: event.target.value
    })
  }

  handlePinAdd = () => {
    let visitedValue = null;
    if (this.state.needsTimestamp) visitedValue = firebase.firestore.FieldValue.serverTimestamp();
    const boardId = this.props.match.params.boardId;
    this.state.newLabel && this.state.newLocation &&
      db.collection('boards').doc(boardId).collection('pins').add({
        label: this.state.newLabel,
        coordinates: new firebase.firestore.GeoPoint(this.state.newLocation[1], this.state.newLocation[0]),
        visited: visitedValue
      })
        .then(() => {
          this.setState({ newLocation: null, newLabel: '', showLabel: null, needsTimestamp: false });
          console.log('Pin successfully added');
        })
        .catch((err) => console.error('Add unsuccessful: ', err))
      db.collection('boards').doc(boardId).update({
        coordinates: new firebase.firestore.GeoPoint(this.state.newLocation[1], this.state.newLocation[0])
      })
      .catch(error => console.error('Unable to update center of board', error))
  }
  toggleEditLabel = () => {
    this.setState({ editLabel: !this.state.editLabel });
  }
  changeLabel = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
      {
        label: this.state.newLabel
      }
    )
    .then(() => this.setState({ editLabel: false}))
    .catch(err => console.error('Unable to change label', err))
  }

  handlePinClick = pin => {
      this.setState({
        selectedPin: pin,
        center: pin.coords,
        zoom: [13.5],
        newLocation: null
      })
  }

  markAsVisited = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
      {
        visited: firebase.firestore.FieldValue.serverTimestamp()
      }
    )
      .catch(error => console.error('Unable to mark as visited', error))
  }

  markAsUnvisited = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).update(
      {
        visited: null
      }
    )
      .catch(error => console.error('Unable to unmark pin', error))
  }

  handlePinDelete = pinId => {
    const boardId = this.props.match.params.boardId;
    db.collection('boards').doc(boardId).collection('pins').doc(pinId).delete()
      .then(() => {
        console.log('Pin successfully deleted')
      })
      .then(() => {
        this.setState({ selectedPin: null, zoom: [12] })
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
            height: "100vh",
            width: "100vw"
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
            this.state.selectedPin && (
              <Popup
                key={this.state.selectedPin.label}
                coordinates={this.state.selectedPin.coords}
                offset={50}
              >
                <div>
                  <button onClick={()=> this.setState({ selectedPin: null, zoom: [13], newLocation: null }) } id='close-popup'><i class="window close outline icon" size='medium'></i></button>
                  <div>
                    {
                      this.state.editLabel ?
                        (
                          <div>
                            <Icon name='arrow left' color='black' size='large' fitted={true} onClick={() => (<Button onClick={this.toggleEditLabel()} />)} />
                            <input type="text" name='newLabel' placeholder={this.state.selectedPin.label} value={this.state.newLabel} onChange={this.handleLabelChange} />
                            <Icon name='checkmark' color='green' size='large' fitted={true} onClick={() => (<Button onClick={this.changeLabel(this.state.selectedPin.pinId)}/>)} />
                          </div>
                        )
                        :
                        (this.state.selectedPin.label + ' ')
                    }

                    {
                      !this.state.editLabel && this.state.openStatus === 'open' &&
                      <Icon name='write' color='black' size='large' fitted={true} onClick={() => (<Button onClick={this.toggleEditLabel()} />)} />
                    }
                  </div>
                  <div className='options-container'>
                    {/*<Popup
                  trigger={<Icon name='trash outline' color='red' size='huge' fitted={true} />}
                  content={
                    <div>
                      <p>Are you sure?</p>
                      <Button color='red' content='Delete' onClick={()=>this.handlePinDelete(this.state.selectedPin.pinId)} />
                    </div>
                  }
                  on='click'
                />
                */}
                    {
                      !this.state.selectedPin.visited && this.state.openStatus === 'open' &&
                      <Icon name='checkmark box' color='grey' size='big' fitted={true} onClick={() => (<Button onClick={this.markAsVisited(this.state.selectedPin.pinId)} />)} />

                    }
                    {
                      this.state.selectedPin.visited && this.state.openStatus === 'open' &&
                      <Icon name='remove' color='grey' size='big' fitted={true} onClick={() => (<Button onClick={this.markAsUnvisited(this.state.selectedPin.pinId)} />)} />
                    }
                    {
                      this.state.openStatus === 'open' &&
                      <Icon name='trash outline' color='red' size='big' fitted={true} onClick={() => this.handlePinDelete(this.state.selectedPin.pinId)} />
                    }


                  </div>
                </div>
              </Popup>
            )
          }
          {
            this.state.newLocation && this.state.openStatus === 'open' && (
              !this.state.showLabel
              ? 
                <Popup
                  coordinates={this.state.newLocation}
                >
                  <button id='close-popup' onClick={()=> this.setState({ newLocation: null }) } id='close-popup'><i class="window close outline icon" size='medium'></i></button>
                  <p>Add new pin?</p>
                  <div id='pin-options'>
                    <button onClick={() => this.handleShowLabel(false)}><img src='/attributes/hollowPinOption.png' /></button>
                    <button onClick={() => this.handleShowLabel(true)}><img src='/attributes/pinOption.png' /></button>
                    <div>
                      <small id='want-to-go'>want to go</small>
                      <small id='here-now'>here now</small>
                    </div>
                  </div>
                </Popup>
              :
              <Popup
                coordinates={this.state.newLocation}
              >
                <div>
                  <button id='close-popup' onClick={() => this.setState({ showLabel: null })}><i class="chevron left icon"></i></button>
                  <label>
                    <p>Label:</p>
                    <input type="text" name='newLabel' placeholder="ex: Best Ice Cream!" value={this.state.newLabel} onChange={this.handleLabelChange} />
                    <button id='checkmark' onClick={this.handlePinAdd}><i class="check icon"></i></button>
                  </label>
                </div>
              </Popup>
            )
          }
        </Map>
        
        <div className="footer">
        
        <Icon name= "angle double left" size="large" onClick={history.goBack}/>
          
        <Dropdown className="settings" icon="settings" upward >
       
          <Dropdown.Menu> 
            <Button.Group basic vertical>
              <Dropdown.Item> 
                  <Button basic content= "Pintrips Style" onClick={this.switchStyle} id='basic' type='radio' name='rtoggle' value={pintripsStyle} />
                </Dropdown.Item>
              <Dropdown.Item> 
                  <Button basic content=" Moonlight" onClick={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={moonLightStyle} />
                </Dropdown.Item>
              <Dropdown.Item> 
                  <Button basic content="Vintage" onClick={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={vintageStyle} />
                </Dropdown.Item>
              </Button.Group>
          </Dropdown.Menu> 
        </Dropdown>
        
        
        
      
        <div className="in-footer">
        
              <LocationSearch 
              className="search-bar" forAddPin={true} updateBoardPins={this.selectPlaceFromSearchBar}>
              <input placeholder="Search for places in  "/>
              </LocationSearch>
            </div> 
          
        </div>
        
          
        
      </div>
    )
  }
}
export default withAuth(SingleBoard);
