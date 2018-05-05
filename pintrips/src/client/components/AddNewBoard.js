import React, { Component } from 'react';
import LocationSearch from './LocationSearch';
import firebase from 'firebase';
import db from '../firestore';
import { withAuth } from 'fireview';

class AddNewBoard extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      coordinates: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  onTitleChange(e){
    this.setState({
      label: e.target.value
    })
  }

  submitCoordinates(coordinates) {
    this.setState({
      coordinates
    })
  }

  //add button onClick handler to send map info to firestore

  //user info needs to be passed into board creation via fireview

  render() {
    console.log('COORDS IN ADD NEW BOARD', this.state.coordinates)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Board Name:
            <input type="text" placeholder="Board Name" size="25" value={this.state.label} onChange={this.onTitleChange}/>
            <button type="submit">Add Title</button>
          </label>
          <div>
            <LocationSearch updateCoordinates={this.submitCoordinates}/>
          </div>
        </form>
        <button >ADD NEW BOARD</button>
      </div>
    )
  }
}

export default AddNewBoard;
