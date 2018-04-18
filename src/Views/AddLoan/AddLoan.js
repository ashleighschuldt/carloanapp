import React, { Component } from 'react';

import './AddLoan.css';

class AddLoan extends Component {
  render() {
    return (
      <div >
          <label>Name:</label>
          <input />
          <label>Purchase Price:</label>
          <input />
          <label>Cash Down:</label>
          <input value={0}/>
          <label>Trade-in Value:</label>
          <label>Loan Amount:</label>
          {this.state.purchasePrice - this.state.cashPrice}
          
      </div>
    );
  }
}

export default AddLoan;