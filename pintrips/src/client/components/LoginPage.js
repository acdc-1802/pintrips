import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// // import { auth } from '../store'
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
  handleChange(event){
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2> Log In </h2>
          <div className="form-group">
            <label className="col-md-2 control-label"> Email </label>
            <div className="col-md-10">
              <input
                className="form-control"
                name='email'
                type='text'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">

            <label className="control-label"> Password   </label>
            <div className="col-md-20">
              <input
              className="form-control"
              name='password'
              type='text'
              defaultValue={this.state.username}
              onChange={this.handleChange}
              />
            </div>
          </div>
        <button type='submit'>Login</button>
        </form>
      </div>




    )
  }
}

