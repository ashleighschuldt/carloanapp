import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    
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
            <Link to={`/`}>Logout</Link>
        </div>
        </div>
    )}
}
export default Header;