import React from 'react';
import { Route, NavLink, Switch, Router } from "react-router-dom";

import News from './News.js';
import addNews from './addNews.js';
import editNews from './editNews.js';

const routesNews = (
   <div>
    <Route path='/news' component={News} />
    <Route path='/addnews' component={addNews}/>
    <Route path='/editnews/:id' component={editNews}/>
   </div>
)
 
export default routesNews


