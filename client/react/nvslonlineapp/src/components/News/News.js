import React from 'react';
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';

import SideBar from '../SideBar.js';
import './News.css';
import newsAPI from '../../api/newsAPI.js';

export default class News extends React.Component {

  constructor()
  {
      super();

      this.handleClick = this.handleClick.bind(this);
      this.reload = this.reload.bind(this);

      this.state = {
        news: []
      }
  } 

  handleClick(e) {
    
      let result = window.confirm('Are you sure want to delete this item?');

      if ( result ) {

          let NewsId = e.target.name;

          newsAPI.deleteSinglenNews(NewsId)
            .then((response) => {
                console.log('success');
                this.reload();
                        
            });

      }

  } 

  reload() {

    newsAPI.getNews().then((response) => {
          console.log(response);

          this.setState({
			      news: response
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
                            <td><Link to={"/editnews/" + row.Id} className="btn btn-sm btn-primary btn-create" >Edit</Link></td>
                            <td><button className="btn btn-sm btn-danger" name={row.Id} onClick={this.handleClick} >Delete</button></td>
                            <td key={row.title}>{row.title}</td>
                            <td key={row.description}>{row.description}</td>
                            <td key={row.created}>{row.created}</td>
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