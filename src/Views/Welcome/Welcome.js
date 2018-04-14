import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div >
          <h1>Welcome to your car loan app!</h1>
          <p>You can use this app to calculate payments with a trade-in vehicle or private sale.
            Compare and see which option is more beneficial to you!</p>
          <p>Save your vehicles, save your different loan options! View some graphs for better visual representation or tables,
            if you prefer to just see the numbers! </p>
          <Link to={`/dashboard`}><button>Continue</button></Link>
      </div>
    );
  }
}

export default Welcome;