import React from 'react';
import { Link, Route, Router, Redirect } from "react-router-dom";
import SideBar from '../SideBar.js';
import './News.css';
// import api from '../../api/api.js';
import newsAPI from '../../api/newsAPI.js';

export default class addNews extends React.Component {

  constructor() 
  {
      super();    

      this.HandleSave = this.HandleSave.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
        SingleNews: [],
        pageTitle: 'Add News',
        title: '',
        description: '',
        redirect: false,
        created: ''
      }
  }
  

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
            'title': this.state.title,
            'description': this.state.description,
            'created': new Date()
          }

          newsAPI.addSingleNews(OnlyNews)
              .then((response) => {
                console.log('success');    
                this.setState({ redirect: true });                
              })
              .catch((error) => {
                console.log('error');
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
               document.getElementById(`${refName}Label`).style = "color: red";             
               error.textContent = `${label} is a required field`; 
               this.refs[refName].style = "border: 1px solid red;";
           }        
           return false;
      }     
      else {
             document.getElementById(`${refName}Label`).style = "color: #2c3e50"; 
             error.textContent = '';
             this.refs[refName].style = "border: 1px solid #dce4ec;";             
      } 
    }

    return true;
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
              <h3>{this.state.pageTitle}</h3>
              
              {this.state.redirect ? <Redirect to="/news" />:
              
              <form noValidate>    
                  {/*NAME*/}
                  <div className="form-group" >
                      <label id="titleLabel" className="control-label">Title</label>
                      <input className="form-control"
                          type="text" 
                          ref="title" 
                          name="title" 
                          value={ this.state.title }
                          onChange={ this.handleChange }
                          placeholder="Enter Title" 
                          required />
                       <div className="has-error" style={{color: 'red'}} id="titleError" />      
                      
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
              }

            </div>
          </div>
        </div>
      </div>   
      
    );
  }
}