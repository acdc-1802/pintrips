import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Popup, Input, Button, List, Label, Sidebar } from 'semantic-ui-react'
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
      pendingBoards: [],
      currentPage: 'HomePage'
    }
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
    console.log('visible', this.state.visible);
  }

  componentDidUpdate({ _user }) {
    if (this.props._user === _user) return
    const user = this.props._user;
    let sum = 0;

    user &&
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          let boards = doc.data().canWrite;
          let pendingBoards = [];
          for (let i in boards) {
            let sender = '';
            if (boards[i] === 'pending') {
              sum += 1;
              db.collection('boards').doc(i).get()
                .then(doc => {
                  return doc.data().creator;
                })
                .then((creator) => {
                  db.collection('users').doc(creator).get()
                    .then(doc => {
                      pendingBoards.push({ board: i, sender: doc.data().username })
                    })
                    .catch(error => console.error('Could not find username', error))
                })
                .catch(error => console.error('Could not find creator', error))
            }
          }
          let username = doc.data().username;
          return [username, pendingBoards]
        })
        .then(info => { this.setState({ notifications: sum, username: info[0], pendingBoards: info[1] }) })
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
                  <Icon name='plus square outline' size={'large'} />
                </Menu.Item>
              </Link>
              {/* <Link to={'/SharedWithMe'}> */}
              <Menu.Item borderless='true' id='navbar-notifications'>
                <Popup
                  trigger={<div><Icon name='bell outline' size={'medium'} /><Label color='red' size={'mini'} circular>{this.state.notifications}</Label></div>}
                  content={
                    <List>
                      {
                        this.state.pendingBoards &&
                        this.state.pendingBoards.map(sentBoard => {
                          return (
                            <Link to={`/SingleBoard/${sentBoard.board}`}>
                              <List.Item icon='mail' content={`${sentBoard.sender} sent you a board!`} />
                            </Link>
                          )
                        })
                      }
                    </List>
                  }
                  on='click'
                  position='bottom center'
                />
                {/*
                  this.state.notifications > 0 &&
                  <p id='notification'>{this.state.notifications}</p>
                */}
              </Menu.Item>
              {/*</Link>*/}
              
            </Menu>
          )
        }
      </div>
    );
  }
}

export default withAuth(Navbar);
