import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
              <header>
                <div className="nav-button">
                  <Link to={'/HomePage'}> <button> HOME </button></Link> 
                </div>
                <h1> PinTrips </h1>
              </header>
            </div>
        );
    }
}

export default Navbar;