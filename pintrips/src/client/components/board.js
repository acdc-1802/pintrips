import React, { Component } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

class Board extends Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/destinmcmurrry/cjgrf7lo100062so52bmvhjkm'
    });
  }

  render() {
    return (
      <div>
        <div id='map'></div>
      </div>
    )
  }
}

export default Board;