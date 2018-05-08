import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SingleBoard, LoginPage, SignupPage, HomePage, Navbar, AddNewBoard, SharedWithMe, CannotFind } from './components';
import App from '../App'
import { withAuth } from 'fireview';

const Routes = props => {
  const user = props._user;
    return (
      <Switch>
        {/* PUT ALL YA COMPONENTS IN HERE */}
        <Route path='/SingleBoard/:boardId' component={SingleBoard} />
        <Route exact path='/SingleBoard' component={CannotFind} />
        <Route path='/AddNewBoard' component={AddNewBoard} />
        <Route path='/LoginPage' component={LoginPage} />
        <Route path='/SignupPage' component={SignupPage} />
        <Route path='/HomePage' component={HomePage} />
        <Route path='/SharedWithMe' component={SharedWithMe} />
        <Route path='/404' component={CannotFind} />
        {/* SETS DEFAULT ROUTE TO BE SIGNUP, WILL CHANGE */}
        {
          user && (
            <Route path='/' component={HomePage} />
          )
        }
        <Route path='/' component={SignupPage} />
      </Switch>
    )
}

export default withRouter(withAuth(Routes));
