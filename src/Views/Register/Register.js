import React, { Component } from 'react';
import './Register.css';
import { updateUser } from '../../Redux/actions/action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';



class Register extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

handleChange(e){
    const userInfo = ({
        [e.target.name]: e.target.value,
    })
    this.props.updateUser(userInfo)
}

createUserOrLogin(e, login){
  e.preventDefault();
  axios.post(`/api/auth/${login}`, {username:this.props.user.username, password:this.props.user.password, address: this.props.user.address, city: this.props.user.city, state: this.props.user.state, zip: this.props.user.zip })
      .then((response)=>{
          if(response.data==='Registration successful'){
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
        <div>
            <div className='addvehicle'>
                <label>Username:</label>
                <input name='username' onChange={ this.handleChange }/>
            <br/>
                <label>Password:</label>
                <input type='password' name='password' onChange={ this.handleChange }/>
            <br/>
                <label>Address:</label>
                <input name='address' onChange={ this.handleChange }/>
            <br/>
                <label>City:</label>
                <input name='city' onChange={ this.handleChange }/>
            <br/>
                <label>State:</label>
                <input name='state' onChange={ this.handleChange }/>
            <br/>
                <label>Zip:</label>
                <input name='zip' onChange={ this.handleChange }/>
            <br/>
        </div>  
          <div className='save'>
            <button onClick={(event)=>{this.createUserOrLogin(event, 'register')}}>Create Account</button>
          </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect (state => state, mapDispatchToProps)(Register);