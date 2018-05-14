import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Divider } from 'semantic-ui-react'

const WelcomePage = () => {
  return (
    <div className='profile-container'>
      <h1 id='profile-name' >Welcome to Pintrips</h1>
      <small id='profile-email'>Get Started: </small>
      <Segment padded>
        <Link to='/LoginPage'>
          <Button primary fluid>Login</Button>
        </Link>
        <Divider horizontal>Or</Divider>
        <Link to='/SignupPage'>
          <Button secondary fluid>Sign Up Now</Button>
        </Link>
      </Segment>
    </div>
  )
}

export default WelcomePage;