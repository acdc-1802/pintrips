import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { withAuth } from 'fireview'
// import '/Users/crysmags/fullDev/pintrips/pintrips/public/style.css'

const Navbar = props => {

  const user = props._user;

  return (
    <Menu>
      <Menu.Menu>
        <Menu.Item>
          <Link to='/HomePage'>
            <img id='logo' src='/attributes/logo.png' className='Navbar-logo' />
            <h1> Pintrips </h1>
          </Link>
        </Menu.Item>
        { 
        user &&
          (
          <Menu.Item id='navbar-email'>
            <h4>Welcome, {user.email}</h4>
          </Menu.Item>
          )
        }
      </Menu.Menu>
    </Menu>
  );
}

export default withAuth(Navbar);
