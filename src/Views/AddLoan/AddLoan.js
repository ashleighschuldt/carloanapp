import React, { Component } from 'react';

import './AddLoan.css';

class AddLoan extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  loanPayment(){
    
  }
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
          {this.state.purchasePrice - this.state.cashPrice }
          <label>Annual Interest Rate</label>
          <input />
          <label>Loan Term (in months):</label>
          <input />
          <button>Calculate</button>
          <button>Save</button>
          <label>Monthly Payment:</label>
          { this.state.payment }
          <label>Total Interest</label>
          { this.state.totalInterest }
          
      </div>
    );
  }
}

export default AddLoan;