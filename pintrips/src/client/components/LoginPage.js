import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// // import { auth } from '../store'
import { Form } from 'semantic-ui-react';
import firebase from 'firebase';
import db from '../firestore';

const allUsers = db.collection('users');
const emailProvider = new firebase.auth.EmailAuthProvider()

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: 'Login',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    firebase.auth().signInWithEmailAndPassword(email, password)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
      })
      .then(user => {
        console.log(firebase.auth().currentUser.uid)
        window.location.href = "/HomePage"
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.Message
        console.log(errorCode, errorMessage)
      })
  }
  render() {
    return (
      
      <div >
      <form onSubmit={this.handleSubmit}>
      <Form className="login-container">
        <Form.Group widths='equal' >
        <div className="form-group">
          <Form.Input fluid label='Email' placeholder='Email' 
          
          className="form-control"
          name='email'
          type='text'
          defaultValue={this.state.username}
          onChange={this.handleChange}
        />
        </div>  
        <div className="form-group">
          <Form.Input fluid label='Password' placeholder='Password'
          
          className="form-control"
          name='password'
          type='text'
          defaultValue={this.state.username}
          onChange={this.handleChange}
        />
        </div>  
          
          
        </Form.Group>
        
        <Form.Button>Submit</Form.Button>
      </Form>
      </form>
      </div>
    )
  }
}
