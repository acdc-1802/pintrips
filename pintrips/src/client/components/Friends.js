import React from 'react';
import { Map, withAuth } from 'fireview';
import db from '../firestore';
import { Header, Icon } from 'semantic-ui-react';
import FriendsList from './FriendsList';
import { Link } from 'react-router-dom';

const Friends = (props) => {

  const user = props._user;
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
            <Link to='/AddFriend'>
              <Icon name='add user' color='grey' size='large' id='add-user-icon' />
            </Link>
          </Header>

        </div>
      }
      {
        user &&
        <Map
          from={db.collection('users').doc(props._user.uid)}
          Loading={() => 'Loading...'}
          Render={(props) => {
            let acceptedFriends = {};
            for (let friend in props.friends) {
              if (props.friends[friend].status === 'accepted') {
                acceptedFriends[friend] = {
                  friends: true,
                  status: 'accepted'
                };
              }
            }
            return(
              <FriendsList friends={acceptedFriends} />
            );
          }}
          Empty={() =>
            <h3 >You don`t have any friends :(</h3>
          }
        />
      }
    </div>
  );
};

export default withAuth(Friends);
