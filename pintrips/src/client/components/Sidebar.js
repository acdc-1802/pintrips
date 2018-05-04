import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="side-button">

          <button className="button"> ALL MY BOARDS </button> 
          <button className="button"> MY SHARED BOARDS </button> 
          <button className="button"> MY UNIVERSAL BOARD </button> 
        </div>
      </div>
    );
  }
}

export default Sidebar;
