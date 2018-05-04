import React, { Component } from 'react';

class AddNewBoard extends Component {
  constructor() {
    super();
    this.state = {
      boardTitle: ''
    }
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name="title" placeholder="Board Name" size="25" value={this.state.boardTitle}/>
        </form>
      </div>
    )
  }
}
