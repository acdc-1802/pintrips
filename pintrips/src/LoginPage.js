import React, {Component} from 'react'
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
      <div>
      
          
          <section>
              <h2> Sign Up </h2>
              <div className="form-group">
              
              <label className="control-label"> First Name   </label>
              <div className="col-md-20">
                  <input
                  className="form-control"
                  />
                  </div>
                  </div>
                  <div className="form-group">
                  <label className="control-label"> Last Name</label>
                  <div className="col-md-10">
                  <input
                  className="form-control"
                  
                  />
                  </div>
                  </div>
                  <div className="form-group">
                  <label className="col-md-2 control-label"> Email </label>
                  <div className="col-md-10">
                  <input
                  className="form-control"
                  
                 
                  />
                  </div>
                  </div>
                  <div className="form-group">
                  <label className="col-md-2 control-label"> G.P.A. </label>
                  <div className="col-md-10">
                  <input
                  className="form-control"
                  
                  />
                  </div>
                  </div>
                  <div className="form-group">
                  <label className="col-md-2 control-label"> Picture </label>
                  <div className="col-md-10">
                  <input
                  className="form-control"
                  
                  />
                  </div>
                  </div>
                  
                  
                  
                  </section>
                  </div>
                        
                      
                    
      
    )
  }
}

