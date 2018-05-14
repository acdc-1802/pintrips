import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import firebase from 'firebase';
import history from '../../history';

const emailProvider = new firebase.auth.EmailAuthProvider()

export default class LoginPage extends Component {

  state = {
    displayName: 'Login',
    email: '',
    password: '',
    error: false,
    active: false
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
      .then(() => { this.setState({ success: true }) })
      .then(() => { setTimeout(() => this.setState({ success: false }), 3000) })
      .then(user => {
        // needs actual message ' sorry wrong user name and/or password '
        console.log(firebase.auth().currentUser.uid)
        history.push('/HomePage');
      })
      .catch(error => {
        this.setState({ error: true })
        //history.push('/404');
      })

  }

  render() {
    return (
      <div className="login-container" >
        <Form onSubmit={this.handleSubmit} error>
          <h3>Login</h3>
          <div className='forms'>
            <Form.Group stackable='true' className="input-container">
              <Form.Input stackable='true' fluid label='Email' placeholder='Email'
                className="form-control"
                name='email'
                type='text'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />

              <Form.Input stackable='true' fluid label='Password' placeholder='Minimum 6 Characters'
                className="form-control"
                name='password'
                type='password'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            {
              this.state.error &&
              <Message
                error
                header='Login Unsuccessful!'
                content='email/password incorrect'
              />
            }

          </div>
          {this.state.password.length < 6 ?
            <Form.Button disabled className="form-group">Log In</Form.Button>
            :
            <Form.Button active className="form-group">Log In</Form.Button>
          }
        </Form>
        <br />
        <Link to={'/SignupPage'}>
          <small>Don't have an account? Sign Up!</small>
        </Link>
      </div>
    )
  }
}
