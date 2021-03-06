import React, { Component } from 'react';
import db from '../firestore';
import { Grid, Segment, Image, Header, Icon, Popup, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: props.friends,
      friendsInfo: [],
      friendAdded: false
    };
    this.handleAddFriend = this.handleAddFriend.bind(this);
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
            });
          })
          .then(() => this.setState({ friendsInfo }))
          .catch(error => console.error('Unable to get friends info', error));
    }
  }
  handleAddFriend(userId) {
    let user = this.props._user;
    user &&
      db.collection('users').doc(user.uid).set({
        friends: {
          [userId]: {
            status: 'requested',
            friends: false
          }
        }
      }, { merge: true }
      ).then(() => {
        let fullName = '';
        db.collection('users').doc(user.uid).get()
          .then(sender => {
            fullName = sender.data().first + ' ' + sender.data().last;
          })
          .then(() => {
            db.collection('users').doc(userId).set({
              friends: {
                [user.uid]: {
                  status: 'pending',
                  senderName: fullName
                }
              }
            }, { merge: true })
              .catch(error => console.error('Unable to add you as a friend', error));
          });
      })
        .then(() => { this.setState({ friendAdded: true }); })
        .then(() => { setTimeout(() => this.setState({ friendAdded: false }), 3000); })
        .catch(error => console.error('Unable to add friend', error));

  }
  render() {
    return (
      <div >
        <Grid stackable columns={3} className='friendsList-container'>
          {
            !Object.keys(this.state.friends).length &&
            <div className='no-friends-msg'>
              <small id='profile-email'>You don`t have any friends  yet :(</small>
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
                        <Popup
                          trigger={
                            <Icon id='add-user' color='grey' name='add user' />
                          }
                          content={
                            <div>
                              {
                                !this.state.friendAdded ?
                                  (
                                    <div>
                                      <p>Would you like to add {friend.first}?</p>
                                      <Button onClick={() => (<Button onClick={this.handleAddFriend(friend.id)} />)}>Add</Button>
                                    </div>
                                  )
                                  :
                                  <p>Friend requested!</p>
                              }
                            </div>
                          }
                          position='bottom center'
                          on='click' />

                      </Segment>)
                  }
                </Grid.Column>
              );
            })
          }
        </Grid>
      </div>
    );
  }
}

export default withAuth(FriendsList);
