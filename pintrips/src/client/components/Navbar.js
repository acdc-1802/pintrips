import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Container, Header, Item } from 'semantic-ui-react'
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
    <div className="navbar-bar">
      <Header
        as='h3'
        textAlign='center'
        />
      <Container>
      <Menu stackable className='navbar'>
          <div className='logo'>
            <Menu.Item >
              <Link to='/HomePage'>
                <img id='logo' src='/attributes/logo.png' className='Navbar-logo' />
              </Link>
            </Menu.Item>
          </div>
          <div className='title'>
            <Menu.Item>
              <Link to='/HomePage'>
              <h2> Pintrips </h2>
              </Link>
            </Menu.Item>
          </div>
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
              <div className='logout-button'>
                <Menu.Item id='navbar-logout'>
                  <a href='#' onClick={handleLogout}>Logout</a>
                </Menu.Item>
              </div>
            )
          }
      </Menu>
      </Container>
      <Menu className='sub-navbar'>
        <Link to={'/HomePage'}><Menu.Item id='dropdown'>My Boards</Menu.Item></Link>
        <Link to={'/SharedWithMe'}><Menu.Item id='dropdown'>Shared With Me</Menu.Item></Link>
        <Link to={'/AddNewBoard'}><Menu.Item id='create-btn'>Create New</Menu.Item></Link>
      </Menu>
    </div>
  );
}

export default withAuth(Navbar);
