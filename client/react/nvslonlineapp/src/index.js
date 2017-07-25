// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, HashRouter, BrowserRouter, Router } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App';

const history = createBrowserHistory();

const app = document.getElementById('root');

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={App}/>
  </Router>),
app);
