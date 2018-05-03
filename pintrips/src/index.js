import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(

      <Router history={history}>
        <Routes />
      </Router>,
    
    document.getElementById('app')
  )
