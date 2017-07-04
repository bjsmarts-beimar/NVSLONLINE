// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, HashRouter } from "react-router-dom";

import App from './App';

const app = document.getElementById('root');

ReactDOM.render((
  <HashRouter>
    <Route path='/' component={App}/>
  </HashRouter>),
app);
