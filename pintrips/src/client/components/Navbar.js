import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Icon, Popup, List, Label, Image, Loader } from 'semantic-ui-react'
import { withAuth, Map } from 'fireview'
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
      currentPage: 'HomePage',
      profileImg: '',
      loading: true
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
    user &&
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          let username = doc.data().username;
          let profileImg = doc.data().profileImg;
          this.setState({ username, profileImg, loading: false })
        })
        .catch(error => console.error('Could not get notifications', error))
  }
  render() {
    const user = this.props._user;
    const handleLogout = () => {
      firebase.auth().signOut()
        .then(() => history.push('/LoginPage'))
    }
    return (
      <div>
        <div className='navbar'>
          <Link className='logo' to='/HomePage'>
            <img id='logo' alt='logo' src='/attributes/logo.png' />
          </Link>
          <Link className='logo' to='/HomePage'>
            <h1 id='name'>Pintrips</h1>
          </Link>
          {
            user &&
            (
              <div className='user-nav'>
                <div className='user-profile'>
                  {
                    !this.state.loading ?
                      <Link id='navbar-link' to='/Profile' >
                        <Image id='navbar-pic' src={this.state.profileImg} />
                      </Link>
                      :
                      <Loader active inline size='small' />
                  }
                  <small id='username'>{this.state.username}</small>
                </div>
              </div>
            )
          }
        </div>
        {
          user &&
          (
            <Menu className='sub-navbar' borderless={true}>
              <Dropdown id='dropdown' icon="bars" floating>
                <Dropdown.Menu>

                  <Dropdown.Item id='dropdown-item'>
                    <Link to={'/HomePage'}>
                      <Menu.Item id='myboards'>
                        <Icon name='map' />
                        My Boards
                    </Menu.Item>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id='dropdown-item'>
                    <Link to={'/SharedWithMe'}>
                      <Menu.Item id='myboards' >
                        <Icon name='share alternate' />
                        Shared With Me
                    </Menu.Item>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id='dropdown-item'>
                    <Link to={'/HomePage'}>
                      <Menu.Item id='myboards'>
                        <Icon name='star' />
                        Starred
                    </Menu.Item>
                    </Link>
                  </Dropdown.Item>


                  <Dropdown.Item id='dropdown-item'>
                    <Link to={`/Friends/${this.props._user.uid}`}>
                      <Menu.Item id='myboards'>
                        <Icon name='users' />
                        Friends
                    </Menu.Item>
                    </Link>
                  </Dropdown.Item>

                </Dropdown.Menu>

              </Dropdown>
              <Link to={'/AddNewBoard'}>
                <Menu.Item id='create-btn'>
                  <Popup
                    trigger={
                      <div>
                        <Icon name='plus square outline' size={'large'} />
                      </div>
                    }
                    content={'Add a new board'} />
                </Menu.Item>
              </Link>
              <Menu.Item borderless='true' id='navbar-notifications'>
                <Popup
                  trigger={
                    <div>
                      <Icon name='bell outline' />
                      {
                        this.props._user &&
                        <Map
                          from={db.collection('users').doc(this.props._user.uid)}
                          Render={(props) => {
                            let pending = props.canWrite;
                            let sum = 0;
                            for (let i in pending) {
                              pending[i].status === 'pending' && sum++
                            }
                            return (
                              sum > 0 &&
                              <Label color='red' size={'mini'} circular>{sum}</Label>
                            )
                          }}
                        />
                      }
                    </div>
                  }
                  content={
                    <List>
                      {
                        this.props._user &&
                        <Map
                          from={db.collection('users').doc(this.props._user.uid)}
                          Render={(props) => {
                            let pending = props.canWrite;
                            let pendingBoards = [];
                            for (let i in pending) {
                              pending[i].status === 'pending' &&
                                pendingBoards.push({ board: i, sender: pending[i].sender })
                            }
                            return (
                              pendingBoards &&
                              pendingBoards.map((sentBoard, idx) => {
                                return(
                                  <Link key={idx} to={`/SingleBoard/${sentBoard.board}`}>
                                    <List.Item icon='mail' content={`${sentBoard.sender} sent you a board!`} />
                                  </Link>
                                )
                              })
                            )
                          }}
                        />
                      }
                    </List>
                  }
                  on='click'
                  position='bottom center'
                />
              </Menu.Item>

              <Menu.Item >
                <Popup
                  trigger={
                    <div>
                      <Icon name="log out" onClick={handleLogout} size={"large"} />
                    </div>
                  }
                  content={'Logout'} />

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
