import React from 'react';
import newsAPI from '../api/newsAPI.js';
import './StylePages.css';

export default class Home extends React.Component {

  constructor()
  {
      super();

      this.reload = this.reload.bind(this);
      this.handleClick = this.handleClick.bind(this);

      this.state = {
        news: [],
        selectedTitle: '',
        selectedDescription: '',
        selectedDateCreated: ''
      }
  }

  componentWillMount() {
      this.reload();
  }

  handleClick(e) {
    var nodes = Array.prototype.slice.call( e.currentTarget.children );
    var index = nodes.indexOf( e.target );    
    var SingleNewsId = nodes[index].id;
    
    newsAPI.getSinglenNews(SingleNewsId).then((response) => {
            this.setState({
			        selectedTitle: response.title,
              selectedDescription: response.description,
              selectedDateCreated: response.created
		        })
        });
  }

  reload() {

    newsAPI.getNews().then((response) => {

          let title = response[0].title;
          let description = response[0].description;
          let created = response[0].created;
          
          this.setState({
			      news: response,                        
            selectedTitle: title,
            selectedDescription: description,
            selectedDateCreated: created
		      })             

          console.log('state', this.state);
	    });

  } 
    
  render() {
    var allNews = [];
    
    this.state.news.map(function(row, i) {
      allNews.push(
        <div key={row.Id} id={row.Id} name={row.Id} className='link' >{row.title}</div>          
      );
    });
    
    return (
      <div>
        <div className="container">
            <h1>News From The League</h1>
            <div className="panel panel-default">
              <div className="panel-heading">{this.state.selectedTitle}</div>
              <div className="panel-body">{this.state.selectedDescription}</div>
            </div>
            <h3>All News</h3>
            <div onClick={this.handleClick}>
              {allNews}  
            </div>                    
        </div>
      </div>
    );
  }
}