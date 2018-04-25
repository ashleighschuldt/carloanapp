import React, { Component } from 'react';
import Header from '../../Components/Header';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends Component {
  
  render() {
    return (
      <div >
        { this.props.user.username }'s Dashboard
        <Header />
          Dashboard
          <Link to={`/vehicles`}>Vehicles</Link>
          <Link to={`/loan`}>Loans</Link>
          <p> You have no saved vehicles or loans. 
            Click on vehicles to get started!</p>
      </div>
    );
  }
}



export default connect (state => state)(Dashboard);