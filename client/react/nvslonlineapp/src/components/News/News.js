import React from 'react';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';

import SideBar from '../SideBar.js';
import './News.css';
import api from '../../api/api.js';


export default class News extends React.Component {

  constructor()
  {
      super();
      this.state = {
        news: []
      }
  }

  componentWillMount() {
      api.getNews().then((response) => {
          this.setState({
			      news: response
		      })
	    });
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
                    <b>News</b>
                    <div className="pull-right">
                      <Link to="/addnews" className="btn btn-sm btn-primary btn-create" >Create New</Link>
                    </div>            
                </div>
                <div className="card-block p-0">                  
                  <table className="table table-bordered table-sm m-0">
                    <thead>
                      <tr>
                          <th></th>
                          <th></th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Date Created</th>                                                                                                  
                      </tr>
                    </thead>
                    <tbody>       
                      {this.state.news.map(function(row, i) {
                        return (
                          <tr key={i}>
                            <td><Link to="/" className="btn btn-sm btn-primary btn-create" >Edit</Link></td>
                            <td><Link to="/" className="btn btn-sm btn-danger" >Delete</Link></td>
                            <td key={row.title}>{row.title}</td>
                            <td key={row.description}>{row.description}</td>
                            <td key={row.created}>{row.created}</td>
                          </tr>
                        );
                      })}                                                           
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