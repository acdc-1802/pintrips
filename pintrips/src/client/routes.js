import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SingleBoard, LoginPage, SignupPage, HomePage, AddNewBoard, SharedWithMe, CannotFind } from './components';
import { withAuth } from 'fireview';

const Routes = props => {
  const user = props._user;
  return (
        user
        ? 
        (
          <Switch>
            <Route path='/SingleBoard/:boardId' component={SingleBoard} />
            <Route path='/AddNewBoard' component={AddNewBoard} />
            <Route path='/LoginPage' component={LoginPage} />
            <Route path='/SignupPage' component={SignupPage} />
            <Route path='/HomePage' component={HomePage} />
            <Route path='/SharedWithMe' component={SharedWithMe} />
            <Route path='/404' component={CannotFind} />
            <Route exact path='/' component={HomePage} />
            
          </Switch>
        )
        : 
        ( 
          <Switch>
            <Route path='/LoginPage' component={LoginPage} />
            <Route path='/SignupPage' component={SignupPage} />
            <Route exact path='/' component={LoginPage} />
          </Switch>
        )
  )
}

export default withRouter(withAuth(Routes));
