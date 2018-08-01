import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../firestore';
import { Loader, Button, Popup } from 'semantic-ui-react';
import WorldMap from './WorldMap';
import history from '../../history';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      profileImg: '',
      first: '',
      last: '',
      username: '',
      bannerImg: '',
      loading: true,
      friendRequest: false,
      viewingAltUserProfile: false
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }
  componentDidUpdate({ _user }) {
    if (this.props._user === _user) return;
    let user = this.props.match.params.id || (this.props._user && this.props._user.uid);
    if (user !== this.props._user.uid) {
      this.setState({ viewingAltUserProfile: true });
      db.collection('users').doc(this.props._user.uid).get()
        .then(loggedInUser => {
          if (loggedInUser.data().friends[user].status === 'pending') {
            this.setState({ friendRequest: true });
          }
        })
        .catch(error => console.error('unable to get friendRequest status', error));
    }
    user &&
      db.collection('users').doc(user).get()
        .then(user => this.setState({ userId: user.data().id, profileImg: user.data().profileImg, first: user.data().first, last: user.data().last, email: user.data().email, username: user.data().username, bannerImg: user.data().bannerImg }))
        .then(() => this.setState({ loading: false }))
        .catch(error => console.error('unable to get user info', error));
  }
  handleAccept(loggedInUser) {
    db.collection('users').doc(loggedInUser).set(
      {
        friends: {
          [this.props.match.params.id]: {
            status: 'accepted',
            friends: true
          }
        }
      },
      { merge: true }
    )
      .then(() => {
        db.collection('users').doc(this.props.match.params.id).set(
          {
            friends: {
              [loggedInUser]: {
                status: 'accepted',
                friends: true
              }
            }
          },
          { merge: true }
        )
          .catch(error => console.error('unable to accept request', error));
      })
      .then(() => this.setState({ friendRequest: false }))
      .catch(error => console.error('Unable to accept friend request', error))
  }
  handleDecline(loggedInUser) {
    db.collection('users').doc(loggedInUser).set(
      {
        friends: {
          [this.props.match.params.id]: {
            status: 'declined',
            friends: false
          }
        }
      },
      { merge: true }
    )
      .then(() => {
        db.collection('users').doc(this.props.match.params.id).set(
          {
            friends: {
              [loggedInUser]: {
                status: 'declined',
                friends: false
              }
            }
          },
          { merge: true }
        )
          .catch(error => console.error('unable to decline request', error));
      })
      .then(() => this.setState({ friendRequest: false }))
      .then(() => history.push(`/Friends/${loggedInUser}`))
      .catch(error => console.error('Unable to decline friend request', error));
  }
  render() {
    let user = this.props.match.params.id || (this.props._user && this.props._user.uid);
    return (
      <div className='profile-page'>
        <div className='profile-container'>
          <div className='profile-picture'>
            {
              !this.state.loading ?
                <img alt='profile-img' className='profile-img' src={this.state.profileImg} />
                :
                (<Loader active inline />)
            }
          </div>
          <div className='profile-info'>
            <h2 id='profile-name'>{this.state.first} {this.state.last}</h2>
            <h4 id='profile-username'>Username: {this.state.username}</h4>
            <small id='profile-email'>Email: {this.state.email}</small>
            {
            this.state.viewingAltUserProfile &&
            <div>
              {
                this.state.friendRequest ?
                  (
                    <div>
                      <Button size='tiny' color='green' onClick={() => this.handleAccept(this.props._user && this.props._user.uid)} >Accept</Button>
                      <Button size='tiny' color='red' onClick={() => this.handleDecline(this.props._user && this.props._user.uid)} >Decline</Button>
                    </div>
                  )
                  :
                  (
                    <Popup
                      trigger={<Button size='tiny'>Friends</Button>}
                      content={<Button size='mini' color='red' onClick={() => this.handleDecline(this.props._user && this.props._user.uid)}>Unfriend</Button>}
                      position='right center'
                      hideOnScroll
                      hoverable
                    />
                  )
              }
            </div>
            }
          </div>
        </div>
        <div className='map-container'>
          {
            user &&
            <WorldMap userId={user} owner={true} />
          }
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
