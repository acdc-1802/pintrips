import React, { Component } from 'react';
import LocationSearch from './LocationSearch';

const pintripsStyle = 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq';
const moonLightStyle = 'mapbox://styles/destinmcmurrry/cjgycs1rn001d2rp4ss7jizyf';
const vintageStyle = 'mapbox://styles/destinmcmurrry/cjgwy4k6e000b2rpp80jt98o7';

class Footer extends Component {
  state= {
    style: pintripsStyle,
  }
  switchStyle = event => {
    this.setState({
      style: event.target.value
    });
  }
  render() {
    return (
      <div>
        
      <div id='menu'>
                <div >
                <p> Style: </p>
                  <div >
                    <input onChange={this.switchStyle} id='basic' type='radio' name='rtoggle' value={pintripsStyle} />
                    <label htmlFor='pintrips'>pintrips</label>
                    <input onChange={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={moonLightStyle} />
                    <label htmlFor='moonlight'>moonlight</label>
                    <input onChange={this.switchStyle} id='popArt' type='radio' name='rtoggle' value={vintageStyle} />
                    <label htmlFor='vintage'>vintage</label>
                  </div>
                  </div>
                  
                    <div>
                      <div className='search-coords'>
                        <LocationSearch forAddPin={true} updateBoardPins={this.selectPlaceFromSearchBar} />
                      </div>
                    </div>
                
              </div>
      </div>
    );
  }
}

export default Footer;

