import React from 'react';
import { Link, Route } from "react-router-dom";
import SideBar from '../SideBar.js';
import './News.css';
import api from '../../api/api.js';

export default class addNews extends React.Component {

  HandleSave(e) {
    e.preventDefault();
    
    //console.log('component state', JSON.stringify(this.state.SingleNews));
    //console.log(this.refs); 
    //console.log(this.refs.name.value);  
    //console.log(this.refs.description.value); 

    if (!this.showFormErrors()) {      
      console.log('form is invalid: do not submit');
    } 
    else {
      
      let OnlyNews = {
        'title': this.state.name,
        'description': this.state.description
      }

      let SingleNews = this.state.SingleNews;

      SingleNews.push(OnlyNews);

      this.setState({
        SingleNews: SingleNews
      });

      api.addSingleNews(OnlyNews).then((response) => {
          console.log('success');          
	    });
    }
  }

  showFormErrors() {

      const inputs = document.querySelectorAll('input');
      let isFormValid = true;
      
      inputs.forEach(input => {

        input.classList.add('active');
                    
        const  isInputValid = this.showInputError(input.name);      
        
        if (!isInputValid) {
          isFormValid = false;
        }
      });

      const textarea = document.querySelector('textarea');

      const IsAreaTextValid = this.showInputError(textarea.name);

      if (!IsAreaTextValid) {
        isFormValid = false;
      }
          
      return isFormValid;
  }  

  handleChange(e) {

      e.target.classList.add('active');
      
      this.setState({
        [e.target.name]: e.target.value,               
      });
      
      this.showInputError(e.target.name);
  }

  showInputError(refName) {
    
    if (refName)
    {      
      const validity = this.refs[refName].validity;
      const label = document.getElementById(`${refName}Label`).textContent;
      const error = document.getElementById(`${refName}Error`);
      
      if ( !validity.valid ) {
          if( validity.valueMissing ) {
              error.textContent = `${label} is a required field`; 
              this.refs[refName].style = "border: 1px solid red;";
          }        
          return false;
      }     
      else {
            error.textContent = '';
            this.refs[refName].style = "border: 1px solid #dce4ec;";
      } 
    }

    return true;
  }

  constructor() 
  {
    super();

    this.HandleSave = this.HandleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      SingleNews: [],
      title: 'Add News',
      name: '',
      description: ''
    }
  }

  render() {

    return (   
    
      <div>        
        <div className="container-fluid">
          <div className="col-md-2 sidebar">
            <SideBar />
          </div>
          <div className="col-md-10">
            <div className="main-form main-center">
              <h3>{this.state.title}</h3>
              <form noValidate>    
                  {/*NAME*/}
                  <div className="form-group" >
                      <label id="nameLabel" className="control-label">Title</label>
                      <input className="form-control"
                          type="text" 
                          ref="name" 
                          name="name" 
                          value={ this.state.name }
                          onChange={ this.handleChange }
                          placeholder="Enter Title" 
                          required />
                       <div className="has-error" style={{color: 'red'}} id="nameError" />      
                      
                  </div>

                  {/*DESCRIPTION*/}
                  {<div className="form-group" >
                      <label id="descriptionLabel" className="control-label">Description</label>
                      <textarea className="form-control" 
                        ref="description" 
                        name="description" 
                        value={ this.state.description }
                        onChange={ this.handleChange }
                        rows="10" 
                        placeholder="Enter Description" 
                        required >
                      </textarea>
                      <div className="has-error" style={{color: 'red'}} id="descriptionError" />           
                  </div>}
            
                  {/*SUBMIT BUTTON*/}
                  <div className="btn-block text-right">    
                    <input type="submit" className="btn btn-primary" style={{width: 100}} onClick={this.HandleSave} value="Save" />
                    <Link to="/news" className="btn btn-sm btn-danger btn-create" style={{width: 100}} >Cancel</Link>
                  </div>
              </form>    

            </div>
          </div>
        </div>
      </div>   
      
    );
  }
}