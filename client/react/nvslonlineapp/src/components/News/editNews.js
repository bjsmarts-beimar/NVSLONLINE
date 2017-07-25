import React from 'react';
import { Link, Route, Router, Redirect } from "react-router-dom";
import SideBar from '../SideBar.js';
import './News.css';
import api from '../../api/api.js';

export default class editNews extends React.Component {

    constructor(props) 
    {
        super(props);    
        
        this.state = {
          SingleNews: [],
          pageTitle: 'Edit News',
          title: '',
          description: '',
          redirect: false,
          //created: ''
        }

        let NewsId = props.match.params.id;

        api.getSinglenNews(NewsId).then((response) => {
            console.log(response);
            this.setState({
			        SingleNews: response,
              title: response.title,
              description: response.description
		        })
        });

        
        this.HandleSave = this.HandleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);

        
    }

    HandleSave(e) {
        e.preventDefault();

        if (!this.showFormErrors()) {      
            console.log('form is invalid: do not submit');
        } 
        else {
            console.log('form is valid !!!!!!!');
            
            let OnlyNews = {
              'id': this.props.match.params.id,
              'title': this.state.title,
              'description': this.state.description,
              'modified': new Date()
            }

            api.updateSingleNews(OnlyNews)
              .then((response) => {
                  console.log('success');    
                  this.setState({ redirect: true });                
              })
              .catch((error) => {
                  console.log('error');
            });  
        }
         
    }

    handleChange(e) {

      e.target.classList.add('active');
      
      this.setState({
        [e.target.name]: e.target.value,               
      });

      this.showInputError(e.target.name);

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