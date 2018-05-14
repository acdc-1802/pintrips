import React, { Component } from 'react';
import { Map, withAuth } from 'fireview';
import db from '../firestore';
import { Header, Icon, Grid, Segment, Image } from 'semantic-ui-react';
import FriendsList from './FriendsList';

const Friends = (props) => {

  const user = props._user;
  return (
    <div className='friends-container'>
      <div className='header-container'>
        <Header as='h3'>
          <Icon name='users' id='users-icon' />
          <Header.Content id='profile-username'>
            Friends
            </Header.Content>
            <Icon name='add user' id='add-user-icon' />
        </Header>

      </div>
      {
        user &&
        <Map
          from={db.collection('users').doc(props._user.uid)}
          Loading={() => 'Loading'}
          Render={(props) => {
            return (
              <FriendsList friends={props.friends} />
            )
          }}
          Empty={() =>
            <h3 >You don't have any friends ya loser</h3>
          }
        />
      }
    </div>
  )
}

export default withAuth(Friends);