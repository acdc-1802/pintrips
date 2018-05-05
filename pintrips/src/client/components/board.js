import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

const image = new Image(30, 30);
image.src = '/attributes/pin.png';
const images = ['myImage', image];

class Board extends Component {

  state = {
    // dummy pins
    pins: [ {label: 'place1', coords: [-74.015921, 40.703822]}, {label: 'place2', coords: [-74.013720, 40.711140]}, {label: 'place3', coords: [-74.006376, 40.712368]} ],
    // just for now default fullstack
    center: [-74.010190, 40.705515]
  }

  render() {
    return (
      <div className='board-container'>
        <Map 
          style='mapbox://styles/destinmcmurrry/cjgrf7lo100062so52bmvhjkm'
          zoom={[13.5]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={this.state.center}>
            <Layer 
              type='symbol'
              id='pins'
              layout={{ 'icon-image': 'myImage' }}
              images={images}>
              {
                this.state.pins.map(pin => (
                  <Feature
                    key={pin.label}
                    coordinates={pin.coords}
                  />
                ))
              }
            </Layer>
          </Map>
          <div className='footer'>
            <p id='expand-up'>—</p>
          </div>
      </div>
    )
  }
}

export default Board;