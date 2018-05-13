import React, { Component } from 'react';
import { withAuth } from 'fireview';
import db from '../firestore';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      profileImg: '',
      first: '',
      last: '', 
      username: ''
    }
  }
  componentDidUpdate({ _user }) {
    if (this.props._user === _user) return
    const user = this.props._user;

    user &&
      db.collection('users').doc(user.uid).get()
        .then(user => this.setState({ userId: user.data().id, profileImg: user.data().profileImg, first: user.data().first, last: user.data().last, email: user.data().email,  }))
        .then(() => console.log('state', this.state))
        .catch(error => console.error('unable to get user info', error))
  }
  render() {
    return (
      <div className='homepage-container'>
        <div className='card-group'>
          <div className='signup-container'>
            <h1>Profile</h1>
            <div>
              <img className='profile-img' src={this.state.profileImg} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);