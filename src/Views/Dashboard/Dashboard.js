import React, { Component } from 'react';
import Header from '../../Components/Header';
import { connect } from 'react-redux';

import './Dashboard.css';

class Dashboard extends Component {
  
  render() {
    return (
      <div >
        <div className='username'>
        { this.props.user.username }'s Dashboard
        </div>
        <Header />
        <div className='dashboard'>
          <h1 className='dashboard'>Welcome to your car loan app!</h1>
          <p>You can use this app to calculate payments with a trade-in vehicle or private sale.
            Compare and see which option is more beneficial to you!</p>
            <p>Save your vehicles, save your different loan options!</p>  
        </div>
      </div>
    );
  }
}



export default connect (state => state)(Dashboard);