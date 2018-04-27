import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    
  render() {
    return (
        <div>
        <div>
            <Link to={`/dashboard`}>Home</Link>
        </div>
        <div>
            <Link to={`/`}>Logout</Link>
        </div>
        </div>
    )}
}
export default Header;