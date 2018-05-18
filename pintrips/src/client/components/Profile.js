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
    let user = this.props.match.params.id || (this.props._user && this.props._user.uid) 
    user &&
      db.collection('users').doc(user).get()
        .then(user => this.setState({ userId: user.data().id, profileImg: user.data().profileImg, first: user.data().first, last: user.data().last, email: user.data().email, username: user.data().username, bannerImg: user.data().bannerImg }))
        .then(() => this.setState({ loading: false }))
        .catch(error => console.error('unable to get user info', error))
  }
  render() {
    let user = this.props.match.params.id || (this.props._user && this.props._user.uid) 
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
          </div>
        </div>
        <div className='map-container'>
          {
            user &&
            <WorldMap userId={user} owner={true} />
          }
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);