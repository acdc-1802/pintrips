import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history'

ReactDOM.render(<Router history={history}> 
  <App />
   </Router>, 
   document.getElementById('root'))
