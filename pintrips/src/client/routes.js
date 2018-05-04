import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Board, LoginPage, SignupPage, HomePage, Navbar } from './components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* PUT ALL YA COMPONENTS IN HERE */}
        <Route path='/Board' component={Board} />
        <Route path='/LoginPage' component={LoginPage} />
        <Route path='/SignupPage' component={SignupPage} />
        <Route path='/HomePage' component={HomePage} />
        {/* SETS DEFAULT ROUTE TO BE SIGNUP, WILL CHANGE */}
        <Route path='/' component={SignupPage} />
      </Switch>
    )
  }
}

export default withRouter(Routes);