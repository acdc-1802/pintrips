import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { withAuth } from 'fireview'
import firebase from 'firebase'
import history from '../../history'
// import '/Users/crysmags/fullDev/pintrips/pintrips/public/style.css'

const Navbar = props => {

  const user = props._user;
  const handleLogout = () => {
    firebase.auth().signOut()
    .then(() => history.push('/'))
  }

  return (
    <div>
      <Menu className='navbar'>
          <Menu.Item id='logo'>
            <Link to='/HomePage'>
              <img id='logo' src='/attributes/logo.png' className='Navbar-logo' />
            </Link>
          </Menu.Item>
          <Menu.Item id='name'>
            <h2> Pintrips </h2>
          </Menu.Item>
          {
            user &&
            (
              <Menu.Item id='navbar-email'>
                <p id='welcome'>Welcome, {user.email}</p>
              </Menu.Item>
            )
          }
          {
            user &&
            (
              <Menu.Item id='navbar-logout'>
                <a href='#' onClick={handleLogout}>Logout</a>
              </Menu.Item>
            )
          }
      </Menu>
      <Menu className='sub-navbar'>
        <Link to={'/HomePage'}><Menu.Item id='dropdown'>My Boards</Menu.Item></Link>
        <Link to={'/SharedWithMe'}><Menu.Item id='dropdown'>Shared With Me</Menu.Item></Link>
        <Link to={'/AddNewBoard'}><Menu.Item id='create-btn'>Create New</Menu.Item></Link>
      </Menu>
    </div>
  );
}

export default withAuth(Navbar);