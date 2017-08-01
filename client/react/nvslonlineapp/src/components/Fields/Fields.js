import React from 'react';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';

import SideBar from '../SideBar.js';

import api from '../../api/fieldsAPI.js';
import './fields.css';

export default class fields extends React.Component {

  constructor()
  {
      super();

      this.handleClick = this.handleClick.bind(this);
      this.reload = this.reload.bind(this);

      this.state = {
        fields: []
      }
  }

  handleClick(e) {

      let result = window.confirm('Are you sure want to delete this item?');

      if ( result ) {

          let fieldId = e.target.name;

          api.deleteSingleField(fieldId)
            .then((response) => {
                console.log('success');
                this.reload();
                        
            });

      }

  } 

  reload() {
    api.getFields().then((response) => {
          console.log(response);

          this.setState({
			      fields: response
		      })
	    });
  }

  componentWillMount() {
      this.reload();
  }

  render() {

    return (
      <div>        
        <div className="container-fluid">
          <div className="col-md-2 sidebar">
            <SideBar />
          </div>
          <div className="col-md-10">
            
            <main className="panel pt-5">
              <div className="card mb-5">
                <div className="card-header">
                    <b>Fields</b>
                    <div className="pull-right">
                      <Link to="/addField" className="btn btn-sm btn-primary btn-create" >Create New</Link>                      
                    </div>            
                </div>
                <div className="card-block p-0">

                  <table className="table table-bordered table-sm m-0">
                    <thead>
                      <tr>
                          <th></th>
                          <th>Field Name</th>
                          <th>Created</th>
                          <th>Created By</th>                                                                                                  
                          <th>Modified</th>
                          <th>Modified By</th>
                      </tr>
                    </thead>
                    <tbody>       
                      {this.state.fields.map(function(row, i) {
                        return (
                          <tr key={i}>
                            <td>
                              <Link to={"/editField/" + row.Id} className="btn btn-sm btn-primary btn-create" >Edit</Link>&nbsp;&nbsp;
                              <button className="btn btn-sm btn-danger" name={row.Id} onClick={this.handleClick} >Delete</button>
                            </td>
                            <td key={row.VenueName}>{row.VenueName}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        );
                      }.bind(this))}                                                           
                    </tbody>
                  </table>


                </div>
              </div>
            </main>

          </div>
        </div>
      </div>
    );

  }
}