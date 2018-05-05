import React, { Component } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

class Board extends Component {

  state = {
    // dummy coords
    pinCoords: [[-74.015921, 40.703822], [-74.013720, 40.711140], [-74.006376, 40.712368]],
    // just for now default fullstack
    center: [-74.010190, 40.705515]
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw';
    const map = new mapboxgl.Map({
      container: 'map',
      center: this.state.center,
      zoom: 13,
      style: 'mapbox://styles/destinmcmurrry/cjgrf7lo100062so52bmvhjkm'
    });
    if (this.state.pinCoords.length) {
      // currently under construction
    }
  }

  render() {
    return (
      <div className='board-container'>
        <div id='map'></div>
        <div className='map-overlay'> 
          <div>
          
          </div>
          <div className='footer'>
            <p id='expand-up'>-</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Board;