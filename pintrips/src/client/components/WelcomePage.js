import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Divider } from 'semantic-ui-react'

const WelcomePage = () => {
  return (
    <div className='welcome-container'>
      <small id='profile-email'>Get Started: </small>
      <Segment id='login-signup-options' padded>
        <Link to='/LoginPage'>
          <Button fluid>Login</Button>
        </Link>
        <Divider horizontal>Or</Divider>
        <Link to='/SignupPage'>
          <Button secondary fluid>Sign Up</Button>
        </Link>
      </Segment>
    </div>
  )
}

export default WelcomePage;