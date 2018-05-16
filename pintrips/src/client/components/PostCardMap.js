import React, { Component } from 'react';
import { Image, Card } from 'semantic-ui-react';
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";
import db from '../firestore';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ'
});

const solid = new Image(75, 75);
// solid.src = '/attributes/pin.png';
const solidPins = ['solidImage', solid];

const linePaint = {
  'line-color': '#a11823',
  'line-width': 1
};

export class PostCardMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [],
      visitedPins: [],
      yarnCoords: [],
      style: 'mapbox://styles/cilavery/cjh9g0z111ibf2sqxyqx1nhas'
    }
  }

  componentDidMount() {
   const boardId = this.props.boardId
   const lat = this.props.currentCoord[0]
   const long = this.props.currentCoord[1]
   this.setState({
     center: [long, lat]
   })

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

  render () {
    console.log('state yo', this.state)
    return (
      <div className='postcard-map-sizing'>
      {
        this.state.center.length &&
          <div>
            <Map
              style={this.state.style}
              zoom={[14]}
              containerStyle={{
                height: '500px',
                width: '700px'
              }}
              center={this.state.center}
              pitch={[60]}
              >
            </Map>
            {/* <Layer
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
                    />
                  )
                }
                )
              }
            </Layer> */}
          </div>
      }
      </div>
    )
  }
}

export default PostCardMap


//static map with angled view
{/* <Image src={`https://api.mapbox.com/styles/v1/mapbox/cj3kbeqzo00022smj7akz3o1e/static/${this.props.currentCoord[1]},${this.props.currentCoord[0]},14,0,60/700x500?access_token=pk.eyJ1IjoiY2lsYXZlcnkiLCJhIjoiY2pmMW1paDd0MTQ0bzJwb2Rtemdna2g0MCJ9.64yg764mTUOrL3p77lXGSQ`} className ='postcard-map' rounded/> */}
