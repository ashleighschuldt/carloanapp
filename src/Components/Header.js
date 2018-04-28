import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        axios.get(`/logout`)
        .then(res => {
            res
        })
    }
    
  render() {
    return (
        <div className='header'>
        <div className='home'>
            <Link to={`/dashboard`}>Home</Link>
        </div>
        <div className='vehicles'>
          <Link to={`/vehicles`}>My Vehicles</Link>
        </div>
        <div className='loan'>  
          <Link to={`/loan`}>My Loans</Link>
        </div>
        <div className='logout'>
            <Link to={`/`} onClick={this.logout}>Logout</Link>
        </div>
        </div>
    )}
}
export default Header;