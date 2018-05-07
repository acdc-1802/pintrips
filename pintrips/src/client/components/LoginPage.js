import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import firebase from 'firebase';
import db from '../firestore';
import history from '../../history';

const allUsers = db.collection('users');
const emailProvider = new firebase.auth.EmailAuthProvider()

export default class LoginPage extends Component {

  state = {
    displayName: 'Login',
    email: '',
    password: ''
  }

  handleChange = event => {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  handleSubmit = event => {
    ;
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      })
      .then(user => {
        console.log(firebase.auth().currentUser.uid)
        history.push('/HomePage');
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.Message
        console.log(errorCode, errorMessage)
      })

  }

  render() {
    return (
      <div>
          <Form className="login-container" onSubmit={this.handleSubmit}>
          <h3>Login</h3>
            <Form.Group className="input-container">
              <Form.Input fluid label='Email' placeholder='Email'
                className="form-control"
                name='email'
                type='text'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />

              <Form.Input fluid label='Password' placeholder='Password'
                className="form-control"
                name='password'
                type='text'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Link to={'/SignupPage'}>
              <small>Don't have an account? Sign Up!</small>
            </Link>

            <Form.Button>Log In</Form.Button>

          </Form>
      </div>
    )
  }
}
