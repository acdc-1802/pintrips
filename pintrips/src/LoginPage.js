import React, {Component} from 'react'
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// // import { auth } from '../store'


/**
 * COMPONENT
 */
export default class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      displayName: 'Password'
    }
  }

  render () {
    return (
      <div className='login-container'>
        <h2>Name</h2>
        <form>
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
            <button type="submit">{this.state.displayName}</button>
            <br/>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
      </div>
    )
  }
}

