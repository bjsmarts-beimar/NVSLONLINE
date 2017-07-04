import React from 'react';
import { Route, NavLink, Switch, Link } from "react-router-dom";
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from 'react-router-bootstrap';

export default class Navigationbar extends React.Component {

  state = {
    showLink: true
  }

  onLoginClick = () => {
    this.setState({ showLink: false });
  }

  onSignOutClick = () => {
    this.setState({ showLink: true });
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              {/*<a href="#">Northern Virginia Soccer League</a>    */}
              <NavLink to="/">Northern Virginia Soccer League</NavLink>          
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            
            <Nav pullRight>
              <IndexLinkContainer  to="/">                
                <NavItem eventKey={1}>Home</NavItem>
              </IndexLinkContainer >
              { this.state.showLink ? <LinkContainer to="/teams"><NavItem eventKey={2}>Teams</NavItem></LinkContainer> : null }
              { this.state.showLink ? <LinkContainer to="/schedule"><NavItem eventKey={3}>Schedule</NavItem></LinkContainer> : null }
              { this.state.showLink ? <LinkContainer to="/standings"><NavItem eventKey={4}>Standings</NavItem></LinkContainer> : null }
              { this.state.showLink ? <LinkContainer to="/contacts"><NavItem eventKey={5}>Contacts</NavItem></LinkContainer> : null }
              { this.state.showLink ? <LinkContainer to="/signup"><NavItem eventKey={6}>Sign Up</NavItem></LinkContainer> : null }
              { this.state.showLink ? <LinkContainer to="/dashboard"><NavItem onClick={ this.onLoginClick } eventKey={7}>Log In</NavItem></LinkContainer> : null }              
                            
              { this.state.showLink ? null :                            
              <Nav>
                <NavDropdown eventKey={8} title="User" id="basic-nav-dropdown">
                  <LinkContainer to="/editprofile"><MenuItem eventKey={8.1}>Edit Profile</MenuItem></LinkContainer>
                  <LinkContainer to="/accountsettings"><MenuItem eventKey={8.2}>Account Settings</MenuItem></LinkContainer>
                  <LinkContainer to="/"><MenuItem onClick={ this.onSignOutClick } eventKey={8.3}>Sign Out</MenuItem></LinkContainer>                  
                </NavDropdown>
              </Nav> }

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
