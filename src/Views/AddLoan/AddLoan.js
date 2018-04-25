import React, { Component } from 'react';
import axios from 'axios';
import {loanAmount, loanPayment} from '../../lib/util';
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
      vehicles: [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.tradeInChange = this.tradeInChange.bind(this);
    
  }

  componentWillMount(){
    // axios.get(`/api/tax`)
    //   .then(res => {
    //     this.setState({
    //       taxRate: res.data.totalRate
    //     })
    //   })
    axios.get(`/api/vehicles`)
      .then(response => {
        this.setState({
          vehicles: response.data
        })
      })
  }
  


  handleCalculate(){
      const amount = loanAmount(this.state.none, this.state.tradeInValue, this.state.privateSale, this.state.purchasePrice, this.state.cashDown, this.state.taxRate, this.state.payoff)
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

 tradeInChange(){
   this.setState({
     tradeInValue: this.state.vehicles.tradein_value,
     payoff: this.state.vehicles.payoff
   })
 }

  render() {
const options = this.state.vehicles.map((e,i) => {
  return <option key={i} value={this.state.vehicles[i]}>{this.state.vehicles[i].name}</option>;
});

    return (
      <div >
          <label>Name:</label>
          <input name='name' onChange={ this.handleChange }/>
          <label>Purchase Price:</label>
          <input name='purchasePrice' onChange={ this.handleChange }/>
          <label>Cash Down:</label>
          <input name='cashDown' onChange={ this.handleChange }/>
          <label>Trade-in</label>
          <select >
            <option value="">Select One</option>
            {options}
          </select>
          <label>Private Sale</label>
          <select onChange={ this.tradeInChange }>
            <option value="">Select One</option>
            {options}
          </select>
          <label>No Vehicle</label>
          <input type='checkbox' name='none' value={this.state.none} />
          <label>Tax Rate: </label>
          { this.state.taxRate }
          <label>Loan Amount:</label>
          { this.state.amount }
          <label>Annual Interest Rate</label>
          <input name='interest' onChange={ this.handleChange }/>
          <label>Loan Term (in months):</label>
          <input name='payments' onChange={ this.handleChange }/>
          <button onClick={ this.handleCalculate }>Calculate</button>
          <button>Save</button>
          <label>Monthly Payment:</label>
          { this.monthly }
          
          
      </div>
    );
  }
}

export default AddLoan;



