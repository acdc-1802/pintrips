import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../firestore';
import { Loader } from 'semantic-ui-react';
import WorldMap from './WorldMap';

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
      loading: true
    }
  }
  componentDidUpdate({ _user }) {
    if (this.props._user === _user) return
    const user = this.props._user;

    user &&
      db.collection('users').doc(user.uid).get()
        .then(user => this.setState({ userId: user.data().id, profileImg: user.data().profileImg, first: user.data().first, last: user.data().last, email: user.data().email, username: user.data().username, bannerImg: user.data().bannerImg }))
        .then(() => this.setState({ loading: false }))
        .catch(error => console.error('unable to get user info', error))
  }
  render() {
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
            <h2 id='profile-username'>Username: {this.state.username}</h2>
            <small id='profile-email'>Email: {this.state.email}</small>
          </div>
        </div>
        <div className='map-container'>
          {
            this.props._user &&
            <WorldMap userId={this.props._user.uid} owner={true} />
          }
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);