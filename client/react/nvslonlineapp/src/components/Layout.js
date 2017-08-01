import React from 'react';
import { Route, NavLink, Switch, Router } from "react-router-dom";

import './Layout.css';

import Header from './Header.js';
import Footer from './Footer.js';
import Teams from '../pages/Teams.js';
import Home from '../pages/Home.js';
import Schedule from '../pages/Schedule.js';
import Standings from '../pages/Standings.js';
import Contacts from '../pages/Contacts.js';
import SignUp from '../pages/SignUp.js';
import LogIn from '../pages/LogIn.js';
import EditProfile from '../pages/EditProfile.js';
import AccountSettings from '../pages/AccountSettings.js';
import SignOut from '../pages/SignOut.js';
import Dashboard from './Dashboard/Dashboard.js';
import iTeams from './Teams/iTeams.js';
import iSchedule from './Schedule/iSchedule.js';
import iStandings from './Standings/iStandings.js';
import ISettings from './Settings/iSettings.js';
import Seasons from './Seasons/Seasons.js';
import Divisions from './Divisions/Divisions.js';
import iContacts from './Contacts/Contacts.js';

import fields from './Fields/fields.js';
import addField from './Fields/addField.js';
import editField from './Fields/editField.js';

import News from './News/News.js';
import addNews from './News/addNews.js';
import editNews from './News/editNews.js';

import routesNews from './News/routesNews.js';
import fieldsRoutes from './Fields/fieldsRoutes.js';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/teams' component={Teams}/>
          <Route path='/schedule' component={Schedule}/>
          <Route path='/standings' component={Standings}/>     
          <Route path='/contacts' component={Contacts}/>               
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/editprofile' component={EditProfile}/>
          <Route path='/accountsettings' component={AccountSettings}/>
          <Route path='/logout' component={SignOut}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/iteams' component={iTeams}/>
          <Route path='/ischedule' component={iSchedule}/>
          <Route path='/istandings' component={iStandings}/>
          <Route path='/isettings' component={ISettings}/>
          <Route path='/seasons' component={Seasons}/>
          <Route path='/divisions' component={Divisions}/>
          <Route path='/icontacts' component={iContacts}/>                    
          <Route path='/fields' component={fields} />
          <Route path='/addField' component={addField}/>
          <Route path='/editField/:id' component={editField}/>
          <Route path='/news' component={News} />
          <Route path='/addnews' component={addNews}/>
          <Route path='/editnews/:id' component={editNews}/>                                        
        </Switch>        
        <Footer />
      </div>
    );
  }
}