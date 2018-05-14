import React, { Component } from 'react';
import LocationSearch from './LocationSearch';
import { Form } from 'semantic-ui-react'
import firebase from 'firebase';
import db from '../firestore';
import { withAuth } from 'fireview';
import history from '../../history';
require("firebase/firestore");

class AddNewBoard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      coordinates: [],
      creator: '',
      locked: 'open',
      owners: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.submitCoordinates = this.submitCoordinates.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const creator = this.props._user.uid
    if (!creator) {
      alert('must be logged in')
      window.location.href = '/'
    } else {
      this.setState({ creator, owners: [...this.state.owners, creator] })
    }

    const boards = db.collection('boards')
    this.state.coordinates &&
    boards.add({
      coordinates: new firebase.firestore.GeoPoint(this.state.coordinates[0], this.state.coordinates[1]),
      creator: creator,
      locked: this.state.locked,
      name: this.state.name,
      owners: [creator],
      style: 'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq'
    })
      .then(function (docRef) {
        history.push(`/SingleBoard/${docRef.id}`)
      })
      .catch(err => {
        console.log("Error getting documents: ", err);
        history.pushState('/404')
      })

  }

  onTitleChange(e) {
    this.setState({ name: e.target.value })
  }

  submitCoordinates(coordinates) {
    this.setState({ coordinates })
  }

  render() {
    return (
      <div className="login-container">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label>
              <h3>Board Name:</h3>
                <input type="text" placeholder="Board Name" size="25" value={this.state.name} onChange={this.onTitleChange} />
            </label>
            <div className="form-group">
              <LocationSearch updateCoordinates={this.submitCoordinates} />
            </div>
            <Form.Button type='submit' className="form-group">Add New Board</Form.Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default withAuth(AddNewBoard);
