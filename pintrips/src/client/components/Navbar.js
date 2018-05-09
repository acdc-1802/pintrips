import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Container, Header, Item, Icon } from 'semantic-ui-react'
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
      <div className='navbar'>
        <Link className='logo' to='/HomePage'>
          <img id='logo' src='/attributes/logo.png' />
        </Link>
        <h1 id='name'>Pintrips</h1>
        {
        user &&
          (
          <div className='user-nav'>
            <small id='email'>{user.email}</small>
            <a id='logout' href='#' onClick={handleLogout}>Logout</a>
          </div>
          )
        }
      </div>
      {
      user &&
      (
        <Menu className='sub-navbar' borderless={true}>
          <Link to={'/HomePage'}>
            <Menu.Item id='dropdown'>
              My Boards
          </Menu.Item>
          </Link>
          <Link to={'/SharedWithMe'}>
            <Menu.Item borderless={true} id='dropdown'>
              Shared With Me
          </Menu.Item>
          </Link>
          <Link to={'/AddNewBoard'}>
            <Menu.Item id='create-btn'>
              Create New</Menu.Item>
          </Link>
          <Link to={'/SharedWithMe'}>
            <Menu.Item borderless={true} id='navbar-notifications'>
              <Icon name='bell outline' size='medium' />
            </Menu.Item>
          </Link>
        </Menu>
      )
      }
    </div>
  );
}

export default withAuth(Navbar);
