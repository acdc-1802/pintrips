import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
// import '/Users/crysmags/fullDev/pintrips/pintrips/public/style.css'

class Navbar extends Component {
  render() {
    return (
     <Menu>
        <Menu.Menu>
          <Menu.Item>
            <img id='logo' src='/attributes/logo.png' className='Navbar-logo'/>
            <h1> Pintrips </h1>
          </Menu.Item>
        </Menu.Menu>
     </Menu>
    );
  }
}

export default Navbar;
