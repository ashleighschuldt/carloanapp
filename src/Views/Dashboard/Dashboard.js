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
          <Link to={`/vehicles`}>Vehicles</Link>
          <Link to={`/loan`}>Loans</Link>
          <h1 className='dashboard'>Welcome to your car loan app!</h1>
          <p>You can use this app to calculate payments with a trade-in vehicle or private sale.
            Compare and see which option is more beneficial to you!</p>
            <p>Save your vehicles, save your different loan options!</p>  
      </div>
    );
  }
}



export default connect (state => state)(Dashboard);