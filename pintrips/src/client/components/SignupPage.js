import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import db from '../firestore';

const allUsers = db.collection('users');
const emailProvider = new firebase.auth.EmailAuthProvider()

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      first: '',
      last: '',
      email: '',
      password: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    event.preventDefault();
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
    console.log('state', this.state);
  }
  handleSignup(event){
    event.preventDefault();
    const username = event.target.username.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      console.log("Firetore auth created a new user with an id of: ", newUser.uid)
      return db.collection("users").doc(`${newUser.uid}`).set({
        email: email,
        username: username,
        id: newUser.uid,
        first: first,
        last: last
      })
    })
    .then(newUserDoc => {
      console.log("what I'm returning after creating user", newUserDoc.id)
      window.location.href = "/HomePage"
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.Message
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <h2> Sign Up </h2>
          <div className="form-group">
            <label className="col-md-2 control-label"> Username </label>
            <div className="col-md-10">
              <input
                className="form-control"
                name='username'
                type='text'
                defaultValue={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">

            <label className="control-label"> First Name   </label>
            <div className="col-md-20">
              <input
                className="form-control"
                name='first'
                type='text'
                defaultValue={this.state.first}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label"> Last Name</label>
            <div className="col-md-10">
              <input
                className="form-control"
                name='last'
                type='text'
                defaultValue={this.state.last}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label"> Email </label>
            <div className="col-md-10">
              <input
                className="form-control"
                name='email'
                type='text'
                defaultValue={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label"> Password </label>
            <div className="col-md-10">
              <input
                className="form-control"
                name='password'
                type='text'
                defaultValue={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type='submit'>Signup</button>
        </form>
        
        <div>
        <h2> Already signed up?! </h2>
        <Link to={'./LoginPage'}> <button> Log In </button> </Link>
        
        </div>
        </div>

    )
  }
}



export default SignupPage;
