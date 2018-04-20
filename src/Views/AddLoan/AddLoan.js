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
      purchasePrice: '',
      cashPrice: '',

    }
    this.handleChange = this.handleChange.bind(this);
    this.loanAmount = this.loanAmount.bind(this);
  }

  componentWillMount(){
    axios.get(`/api/tax`)
      .then(res => {
        this.setState({
          taxRate: res.data.totalRate
        })
      })
  }
  
  loanPayment(amount, payments, interest){
    this.setState({
      monthly: amount/((((1+interest)^payments)-1)/(interest*(1+interest)^payments))
    })
  }
  loanAmount(){
    const amount = 0;
    const tradeInNet = this.state.tradeInValue - this.state.payoff;
    const privateSaleNet = this.state.privateSale - this.state.payoff;
    const tax = this.state.tradeInValue?
    this.state.taxRate*(this.state.purchasePrice - this.state.tradeInValue):
    this.state.taxRate*(this.state.purchasePrice);
      if(this.state.none!=''){
        const amount = this.state.purchasePrice - this.state.cashdown + tax
    } else if (this.state.tradeIn!=''){
        const amount = this.state.purchasePrice - this.state.cashdown + tax - tradeInNet
    } else if (this.state.privateSale!=''){
        const amount = this.state.purchasePrice - this.state.cashdown + tax - privateSaleNet 
    } 
        this.setState({
            loanAmount: amount
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
          {this.state.purchasePrice - this.state.cashPrice }
          <label>Annual Interest Rate</label>
          <input name='interest' onChange={ this.handleChange }/>
          <label>Loan Term (in months):</label>
          <input name='payments' onChange={ this.handleChange }/>
          <button onClick={ this.loanAmount }>Calculate</button>
          <button>Save</button>
          <label>Monthly Payment:</label>
          { this.monthly }
          <label>Total Interest</label>
          { this.state.totalInterest }
          
      </div>
    );
  }
}

export default AddLoan;