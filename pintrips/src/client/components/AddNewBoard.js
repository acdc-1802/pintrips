import React, { Component } from 'react';
import LocationSearch from './LocationSearch';

class AddNewBoard extends Component {
  constructor() {
    super();
    this.state = {
      boardTitle: '',
      boardLocation: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  onTitleChange(e){
    this.setState({
      boardTitle: e.target.value
    })
  }

  //add button onClick handler to send map info to firestore

  //user info needs to be passed into board creation via fireview

  render() {

    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Board Name:
            <input type="text" placeholder="Board Name" size="25" value={this.state.boardTitle} onChange={this.onTitleChange}/>
            <button type="submit">Add Title</button>
          </label>
          <div>
            <LocationSearch />
          </div>
        </form>
        <button>ADD NEW BOARD</button>
      </div>
    )
  }
}

export default AddNewBoard;
