import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link id='back' to={'/HomePage'}>{`<`}</Link>
        <img id='logo' src='/attributes/logo.png' />
        <h1> Pintrips </h1>
      </div>
    );
  }
}

export default Navbar;