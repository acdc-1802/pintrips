import React, { Component } from 'react';
import db from '../firestore';
import { Grid, Segment, Image, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: props.friends,
      friendsInfo: []
    }
  }
  componentDidMount() {
    let friendsInfo = [];
    for (let friend in this.state.friends) {
      this.state.friends[friend] &&
        db.collection('users').doc(friend).get()
          .then(user => {
            friendsInfo.push({
              first: user.data().first,
              last: user.data().last,
              email: user.data().email,
              profileImg: user.data().profileImg,
              username: user.data().username,
              id: user.data().id
            })
          })
          .then(() => this.setState({ friendsInfo }))
          .catch(error => console.error('Unable to get friends info', error))
    }
  }
  render() {
    return (
      <div >
        <Grid stackable columns={3} className='friendsList-container'>
          {
            !this.state.friends &&
            <div className='no-friends-msg'>
              <h1 id='profile-email'>You have no friends :(</h1>
            </div>
          }
          {
            this.state.friendsInfo.map((friend, idx) => {
              return (
                <Grid.Column key={idx} className='friends-box-container'>
                  {
                    !this.props.addFriend ?
                      (<Link to={`/Profile/${friend.id}`} >
                        <Segment className='friend-box'>
                          <Image className='friend-img' src={friend.profileImg} />
                          <Header as='h3' className='friend-sub-box'>
                            <Header.Content id='friend-name'>
                              {friend.first} {friend.last}
                            </Header.Content>
                            <Header.Content id='friend-username'>
                              ({friend.username})
                        </Header.Content>
                          </Header>
                        </Segment>
                      </Link>)
                      :
                      (<Segment className='friend-box'>
                        <Image className='friend-img' src={friend.profileImg} />
                        <Header as='h3' className='friend-sub-box'>
                          <Header.Content id='friend-name'>
                            {friend.first} {friend.last}
                          </Header.Content>
                          <Header.Content id='friend-username'>
                            ({friend.username})
                          </Header.Content>
                        </Header>
                        <Icon id='add-user' color='grey' name='add user' />
                      </Segment>)
                  }
                </Grid.Column>
              )
            })
          }
        </Grid>
      </div>
    )
  }
}

export default withAuth(FriendsList);