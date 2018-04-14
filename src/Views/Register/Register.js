import React, { Component } from 'react';
import './Register.css';
import { updateUser } from '../../Redux/actions/action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';



class Register extends Component {

handleChange(e){
    const userInfo = ({
        [e.target.name]: e.target.value,
    })
    this.props.updateUser(userInfo)
}

createUserOrLogin(e, login){
  e.preventDefault();
  axios.post(`/api/auth/${login}`, {username:this.props.user.username, password:this.props.user.password})
      .then((response)=>{
          if(response.data.success){
              this.props.history.push('/Dashboard');
          }else{
              alert("your email or password is incorrect")
          }
      })
      .catch((err)=>{
          console.log(err)
      }) 
}

  render() {
    return (
      <div >
           <label>Username:</label>
          <input name='username' onChange={ this.handleChange }/>
          <label>Password:</label>
          <input type='password' name='password' onChange={ this.handleChange }/>
          <label>Address:</label>
          <input name='address' onChange={ this.handleChange }/>
          <label>City:</label>
          <input name='city' onChange={ this.handleChange }/>
          <label>State:</label>
          <input name='state' onChange={ this.handleChange }/>
          <label>Zip:</label>
          <input name='zip' onChange={ this.handleChange }/>
          <button onClick={(event)=>{this.createUserOrLogin(event, 'register')}}>Create Account</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect (state => state, mapDispatchToProps)(Register);