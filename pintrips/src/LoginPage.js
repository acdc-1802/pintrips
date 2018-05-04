import React, {Component} from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// // import { auth } from '../store'
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBXvgyD8ma7sMx6wKXA_YtspWX0v7pI0wY",
  authDomain: "pintrips-4e855.firebaseapp.com",
  projectId: "pintrips-4e855"
});
// Initialize Cloud Firestore through Firebase
/**
 * COMPONENT
 */
let db = firebase.firestore();
export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: 'Login',
      users: [],
      user: {},
      loading: false
    }
    this.ref = db.collection('users');
    this.handleSubmit = this.handleSubmit.bind('this');
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const users = [];
      let user = {};
      querySnapshot.forEach(doc => {
        users.push(doc.data())
        user = doc.data()
      });
      console.log('user', user)
      this.setState({
        users: users,
        user: user,
        loading: false
      })
    })
  }
  handleSubmit = (event) => {
    console.log('event', event)
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    this.ref.add({
      email,
      password
    })
    .then(data => {
      console.log(`added user = ${data}`);
      this.setState({
        user: {data},
        loading: true
      })
    })
    .catch(err => {
      console.log('error creating user', err)
      this.setState({
        user: {},
        loading: true
      })
    })
  }
  render () {
    return (
      <div className='login-container'>
        <h2>Name</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div>
            { this.state.displayName === 'Login'
              ? <button>Login</button>
              : <button>Sign Up</button>// : <Link to='board'>SignUp</Link>
            }
            <br/>
            <button type="submit">SignUp</button>
            <br/>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
          {
            this.state.users.map(user => (
              <p>{user.email}</p>
            ))
          }
        </form>
      </div>
    )
  }
}

