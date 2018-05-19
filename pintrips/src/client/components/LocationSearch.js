/*global google*/
import React, { Component } from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      coordinates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }


  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ coordinates:[latLng.lat, latLng.lng] });
      })
      .then(() =>  {
        if (this.props.forAddPin) {
          this.props.updateBoardPins(address, this.state.coordinates)
        } else {
          this.props.updateCoordinates(this.state.coordinates)
        }
      })
      .catch(error => console.error('Error', error))
  }

  render() {

    const searchOptions = {
      location: new google.maps.LatLng(this.state.coordinates[0], this.state.coordinates[1]),
      radius: 2000,
      types: ['address']
    }

    return (
      <PlacesAutoComplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >

        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className='location-search'>
            {
              this.props.value
              ?
              <input
                {...getInputProps({
                  placeholder: ` 🔍  Search in ${this.props.value}`,
                  className: 'location-search-input'
                })}
              />
              :
              <input
                {...getInputProps({
                  placeholder: ` 🔍  Board location`,
                  className: 'location-search-input'
                })}
              />
            }
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutoComplete>
    );
  }
}

export default LocationSearch;
