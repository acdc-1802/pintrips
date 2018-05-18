import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import firebase from 'firebase';
import db from '../firestore';
import history from '../../history';


class SignupPage extends Component {

  state = {
    username: '',
    first: '',
    last: '',
    email: '',
    password: '',
    profileImg: 'https://static1.squarespace.com/static/586c76466b8f5b6deb3d6942/58a33603f7e0abdf636c3434/58a33619cd0f68039a5f5d6f/1525807659422/grace.png?format=750w',
    error: false
  };

  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  handleSignup = event => {
    event.preventDefault();
    const username = event.target.username.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const profileImg = this.state.profileImg;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        console.log("Firetore auth created a new user with an id of: ", newUser.uid)
        return db.collection("users").doc(`${newUser.uid}`).set({
          email: email,
          username: username,
          id: newUser.uid,
          first: first,
          last: last,
          profileImg: profileImg
        })
      })
      .then(newUserDoc => (history.push("/HomePage")))
      .catch(error => {
        this.setState({ error: true })
        console.log(error)
      })
  }
  render() {
    return (
      <div className="signup-container">
        <Form onSubmit={this.handleSignup} error>
          <h3> Create An Account </h3>
          <div className='forms'>
            <Form.Input stackable='true'
              fluid label='Username'
              placeholder='Username'
              className='form-control'
              name='username'
              type='text'
              onChange={this.handleChange}
            />
            <Form.Input stackable='true'
              fluid label='First Name'
              placeholder='First Name'
              className='form-control'
              name='first'
              type='text'
              onChange={this.handleChange}
            />
            <Form.Input stackable='true'
              fluid label='Last Name'
              placeholder='Last Name'
              className='form-control'
              name='last'
              type='text'
              onChange={this.handleChange}
            />
            <Form.Input stackable='true'
              fluid label='Email'
              placeholder='Email'
              className='form-control'
              name='email'
              type='text'
              onChange={this.handleChange}
            />
            <Form.Input stackable='true'
              fluid label='Password'
              placeholder='Password'
              className='form-control'
              name='password'
              type='password'
              onChange={this.handleChange}
            />
            {
              this.state.error &&
              <Message
                error
                header='Uh-oh Signup Unsuccessful!'
              />
            }
          </div>
          {
            this.state.password.length < 6 ?
              <Form.Button disabled type="submit" id='signup-button'>Sign Up</Form.Button>
              :
              <Form.Button active type="submit" id='signup-button'>Sign Up</Form.Button>
          }
        </Form>
        <br />
        <Link to={'/LoginPage'}>
          <small>Already have an account? Log In!</small>
        </Link>
        <br />
      </div>

    )
  }
}



export default SignupPage;
