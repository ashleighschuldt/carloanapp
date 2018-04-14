import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../../Redux/actions/action';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Login.css';

class Login extends Component {
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
          <button onClick={(event)=>{this.createUserOrLogin(event, 'login')}}>Login</button>
          <Link to={`/register`}><button>Create an Account</button></Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ updateUser }, dispatch);
}

export default connect (state => state, mapDispatchToProps)(Login);