import React, { Component } from 'react';
import axios from 'axios';

import './AddLoan.css';

class AddLoan extends Component {
  constructor(props){
    super(props);
    this.state = {
      taxRate: '',
      name: '',
      purchasePrice: '',
      cashDown: '',
      tradeInValue: '',
      privateSale: '',
      none: '',
      amount: '',
      monthly: '',

    }
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentWillMount(){
    axios.get(`/api/tax`)
      .then(res => {
        this.setState({
          taxRate: res.data.totalRate
        })
      })
  }
  


  handleCalculate(){
      const amount = loanAmount(this.state.purchasePrice, this.state.cashDown, this.state.taxRate, this.state.tradeInValue, this.state.privateSale, this.state.none, this.state.payoff)
      const monthly = loanPayment(amount, this.state.payments, this.state.interest)
      this.setState({
        monthly,
        amount
      })
    }


  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })  
  }

  render() {
    return (
      <div >
          <label>Name:</label>
          <input name='name' onChange={ this.handleChange }/>
          <label>Purchase Price:</label>
          <input name='purchasePrice' onChange={ this.handleChange }/>
          <label>Cash Down:</label>
          <input value={0} name='cashDown' onChange={ this.handleChange }/>
          <label>Trade-in</label>
          <input type='checkbox' name='tradeIn'/>
          <label>Private Sale</label>
          <input type='checkbox' name='privateSale'/>
          <label>No Vehicle</label>
          <input type='checkbox' name='none' value={this.state.none} checked/>
          <label>Tax Rate: </label>
          { this.state.taxRate }
          <label>Loan Amount:</label>
          { this.state.amount }
          <label>Annual Interest Rate</label>
          <input name='interest' onChange={ this.handleChange }/>
          <label>Loan Term (in months):</label>
          <input name='payments' onChange={ this.handleChange }/>
          <button onClick={ this.loanAmount }>Calculate</button>
          <button>Save</button>
          <label>Monthly Payment:</label>
          { this.monthly }
          
          
      </div>
    );
  }
}

export default AddLoan;

function loanPayment(amount, payments, interest){
  const pmt = amount/((((1+(interest/100/12))^payments)-1)/((interest/100/12)*(1+(interest/100/12))^payments));
  
    return pmt;
}

function loanAmount(purchasePrice, cashDown, taxRate, tradeInValue, privateSale, none, payoff){
    const amount;
    if (none!=''){
      amount: purchasePrice - cashDown + (purchasePrice*taxRate)
    }
    else if (tradeInValue!=''){
      amount: purchasePrice - cashDown + ((purchasePrice-tradeInValue)*taxRate)-(tradeInValue - payoff)
    } 
    else if (privateSale!=''){
      amount: purchasePrice - cashdown +(purchasePrice*taxRate)-(privateSale - payoff)
    } return amount;
}

