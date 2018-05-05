import React, { Component } from 'react';
import LocationSearch from './LocationSearch';
import firebase from 'firebase';
import db from '../firestore';
import { withAuth } from 'fireview';

class AddNewBoard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      coordinates: [],
      creator: '',
      locked: 'open'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
  }

  // componentDidMount() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //         console.log('position', position)
  //         submitCoordinates(position)
  //       })
  //   }
  // }


  handleSubmit(e) {
    e.preventDefault();
    const creator = this.props._user.uid
    this.setState({ creator })
  }

  onTitleChange(e) {
    this.setState({ name: e.target.value })
  }

  submitCoordinates(coordinates) {
    this.setState({ coordinates })
  }

  //add button onClick handler to send map info to firestore

  //user info needs to be passed into  creation via fireview

  render() {
    console.log('state', this.state)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className='login-container'>
            <label>
              Board Name:
            <input type="text" placeholder="Board Name" size="25" value={this.state.name} onChange={this.onTitleChange} />
            </label>
            <div>
              <LocationSearch updateCoordinates={this.submitCoordinates} />
            </div>
            <button type="submit">ADD NEW BOARD</button>
          </div>
        </form>

      </div>
    )
  }
}

export default withAuth(AddNewBoard);
