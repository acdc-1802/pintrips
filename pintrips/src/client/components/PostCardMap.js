import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import db from '../firestore';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

const solid = new Image(75, 75);
solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];


const linePaint = {
  'line-color': '#a11823',
  'line-width': 1.5
};

export class PostCardMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [],
      visitedPins: [],
      yarnCoords: [],
      selectedPin: null,
      title: '',
      style: 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq'
    }
  }

  componentDidMount() {
    const boardId = this.props.boardId
    const lat = this.props.currentCoord[0]
    const long = this.props.currentCoord[1]

    this.setState({
      center: [long, lat]
    })

    db.collection('boards').doc(boardId).get()
      .then(doc => {
        let board = doc.data()
        return board;
      })
      .then(thisBoard => {
        console.log(thisBoard);
        this.setState({
          style: thisBoard.style
        })
      })
      .catch(err => {
        console.error(err);
      });

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
      <div className='postcard-map'>
        {
          this.state.center.length &&
          <Map
            style={this.state.style}
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={this.state.center}
            pitch={[60]}
            zoom={[14]}
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


