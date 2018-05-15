import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SingleBoard, LoginPage, SignupPage, HomePage, AddNewBoard, SharedWithMe, CannotFind, PostCard, Profile, Friends, WelcomePage,PostcardSent, PostcardReceived } from './components';
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
            <Route path='/postcard_send/:boardId' component={PostCard} />
            <Route path={'/postcard_sent'} component={PostcardSent} />
            <Route path={'/postcard_received/:postcardId'} component={PostcardReceived} />
            <Route path='/404' component={CannotFind} />
            <Route path='/Profile' component={Profile} />
            <Route path='/Friends/:id' component={Friends} />
            <Route exact path='/' component={HomePage} />
          </Switch>
        )
        :
        (
          <Switch>
            <Route path='/LoginPage' component={LoginPage} />
            <Route path='/SignupPage' component={SignupPage} />
            <Route exact path='/' component={WelcomePage} />
          </Switch>
        )
  )
}

export default withRouter(withAuth(Routes));
