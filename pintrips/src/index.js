import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history'
import { AuthProvider } from 'fireview'
import * as firebase from 'firebase'

ReactDOM.render(
  <AuthProvider auth={firebase.auth()}>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById('root'))

registerServiceWorker();
