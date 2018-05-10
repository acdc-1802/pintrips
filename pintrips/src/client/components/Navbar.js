import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { withAuth } from 'fireview'
import firebase from 'firebase'
import history from '../../history'
// import '/Users/crysmags/fullDev/pintrips/pintrips/public/style.css'
import db from '../firestore';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null,
      username: null,
      postcard: null
    }
  }
  componentDidUpdate() {
    const user = this.props._user;
    let sum = 0;
    user &&
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          let boards = doc.data().canWrite;
          for (let i in boards) {
            if (boards[i] === 'pending') {
              sum += 1;
            }
          }
          let username = doc.data().username;
          this.setState({ username })
        })
        .then(() => { this.setState({ notifications: sum }) })
        .catch(error => console.error('Could not get notifications', error))
  }
  render() {
    const user = this.props._user;
    const handleLogout = () => {
      firebase.auth().signOut()
        .then(() => history.push('/'))
    }
    return (
      <div>
        <div className='navbar'>
          <Link className='logo' to='/HomePage'>
            <img id='logo' alt='logo' src='/attributes/logo.png' />
          </Link>
          <h1 id='name'>Pintrips</h1>
          {
            user &&
            (
              <div className='user-nav'>
                <small id='email'>Welcome, {this.state.username}</small>
                <button id='logout' onClick={handleLogout}>Logout</button>
              </div>
            )
          }
        </div>
        {
          user &&
          (
            <Menu className='sub-navbar' borderless={true}>
              <Link to={'/HomePage'}>
                <Menu.Item id='myboards'>
                  My Boards
            </Menu.Item>
              </Link>
              <Link to={'/SharedWithMe'}>
                <Menu.Item borderless='true' id='dropdown'>
                  Shared With Me
            </Menu.Item>
              </Link>
              <Link to={'/AddNewBoard'}>
                <Menu.Item id='create-btn'>
                  Create New</Menu.Item>
              </Link>
              <Link to={'/PostCard'}>
                <Menu.Item borderless={true} id='navbar-notifications'>
                  Send a Postcard!
                </Menu.Item>
              </Link>

              <Link to={'/SharedWithMe'}>
                <Menu.Item borderless='true' id='navbar-notifications'>
                  <Icon name='bell outline' />
                  {
                    this.state.notifications > 0 &&
                    <p id='notification'>{this.state.notifications}</p>
                  }
                </Menu.Item>
              </Link>
              </Menu>
          )
        }
      </div>
    );
  }
}

export default withAuth(Navbar);
