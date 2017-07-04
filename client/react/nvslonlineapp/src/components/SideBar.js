import React from 'react';
import './SideBar.css';
import { Route, NavLink, Switch, Link } from "react-router-dom";


export default class SideBar extends React.Component {

  
  render() {
    return (
      <div>     
				<div className="absolute-wrapper"> </div>
					<div className="side-menu">
						<nav className="navbar navbar-default" role="navigation">
							<div className="side-menu-container">
                        <ul className="nav navbar-nav sidebar-background-color">
													<li><Link to="/dashboard"><span className="glyphicon glyphicon-dashboard"></span> Dashboard</Link></li>
													<li><Link to="/iteams"><span className="glyphicon glyphicon-picture"></span> Teams</Link></li>
													<li><Link to="/ischedule"><span className="glyphicon glyphicon-calendar"></span> Schedule</Link></li>
													<li><Link to="/istandings"><span className="glyphicon glyphicon-globe"></span> Standings</Link></li>
													<li><Link to="/seasons"><span className="glyphicon glyphicon-globe"></span> Seasons</Link></li>
													<li><Link to="/divisions"><span className="glyphicon glyphicon-globe"></span> Divisions</Link></li>
													<li><Link to="/fields"><span className="glyphicon glyphicon-globe"></span> Fields</Link></li>
													<li><Link to="/icontacts"><span className="glyphicon glyphicon-globe"></span> Contacts</Link></li>
													<li><Link to="/news"><span className="glyphicon glyphicon-globe"></span> News</Link></li>              
													<li><Link to="/isettings"><span className="glyphicon glyphicon-edit"></span> Settings</Link></li>
												</ul>
                    </div>
                </nav>
            </div>   
      </div>
    );
  }
}