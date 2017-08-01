import React from 'react';
import { Route, NavLink, Switch, Router } from "react-router-dom";

import fields from './fields.js';
import addField from './addField.js';
import editField from './editField.js';

const fieldsRoutes = (
  <div>
    <Route path='/fields' component={fields}/>
    <Route path='/addField' component={addField}/>
    <Route path='/editField/:id' component={editField}/>
  </div>
)
 
export default fieldsRoutes