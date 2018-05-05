import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
              <header>
                <div className="navbar">
                <h1> PinTrips </h1>
                
                <button> HOME </button>
                </div>
              </header>
            </div>
        );
    }
}

export default Navbar;