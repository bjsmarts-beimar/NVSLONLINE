import React from 'react';
import SideBar from '../SideBar.js';

export default class iSettings extends React.Component {
  render() {
    return (
      <div>        
        <div className="container-fluid">
          <div className="col-md-2 sidebar">
            <SideBar />
          </div>
          <div className="col-md-10">
            <p>Settings works!</p>
          </div>
        </div>
      </div>
    );
  }
}