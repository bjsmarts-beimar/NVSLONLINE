import React from 'react';
import SideBar from '../SideBar.js';

export default class iContacts extends React.Component {
  render() {
    return (
      <div>        
        <div className="container-fluid">
          <div className="col-md-2 sidebar">
            <SideBar />
          </div>
          <div className="col-md-10">
            <p>Contacts works!</p>
          </div>
        </div>
      </div>
    );
  }
}