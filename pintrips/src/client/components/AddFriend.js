import React, { Component } from 'react';
import { Map, withAuth } from 'fireview';
import db from '../firestore';
import { Header, Icon, Search } from 'semantic-ui-react';
import FriendsList from './FriendsList';
import { Link } from 'react-router-dom';
class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      isLoading: false,
      searchQuery: '',
      results: {}
    }
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {
    db.collection('users').get()
      .then(snapshot => snapshot.forEach(doc => {
        this.state.allUsers.push({ email: doc.data().email, first: doc.data().first, last: doc.data().last, id: doc.data().id, profileImg: doc.data().profileImg, username: doc.data().username })
      }))
  }
  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
    let results = {}
    this.state.allUsers.forEach(user => {
      let username = user.username.toLowerCase();
      if (username.includes(e.target.value.toLowerCase())) {
        results[user.id] = true
      }
    })
    this.setState({ results });
  }
  render() {
    const user = this.props._user;
    return (
      <div className='friends-container'>
        {
          user &&
          <div className='header-container'>
            <Header as='h3'>
              <Link to={`/Friends/${user.uid}`}>
                <Icon name='users' color='grey' id='users-icon' size='large' />
                <Header.Content id='profile-username'>
                  Friends
                </Header.Content>
              </Link>
              </Header>
              <Search
                loading={this.state.isLoading}
                onSearchChange={this.handleChange}
                placeholder='Search by username'
                onChange={this.handleChange}
                showNoResults={false}
              />

          </div>
        }
        {
          user && this.state.results ?
          (
            <Map
              from={db.collection('users').doc(user.uid)}
              Loading={() => 'Loading'}
              Render={(props) => {
                let nonFriends = {};
                if(props.friends){
                  for (let userID in this.state.results){
                    if (userID !== props.id){
                      if (props.friends[userID]!==true){
                        nonFriends[userID] = true;
                      }
                    }
                  }
                } else {
                  nonFriends = this.state.results;
                }
                return (
                      <FriendsList friends={nonFriends} addFriend={true}/>
                )
              }}
              Empty={() => 'You don`t have any friends ya loser'}
            />
          )
          :
          (<h1>No Results</h1>)
        }
      </div>
    )
  }

}

export default withAuth(AddFriend);