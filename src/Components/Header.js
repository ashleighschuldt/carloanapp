import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    
  render() {
    return (
        <div>
        <Link to={`/dashboard`}>Home</Link>
        <Link to={`/`}>Logout</Link>
        </div>
    )}
}
export default Header;