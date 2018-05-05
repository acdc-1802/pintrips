import React, { Component } from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import AddNewBoard from './AddNewBoard';


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
      .then(() => this.props.updateCoordinates(this.state.coordinates))
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutoComplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >

        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className='location-search'>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
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
