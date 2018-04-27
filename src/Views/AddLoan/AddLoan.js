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
      payoff: '',
      none: 0,
      amount: '',
      monthly: '',
      calc: 'none',
      vehicles: [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.tradeInChange = this.tradeInChange.bind(this);
    this.privateSaleChange = this.privateSaleChange.bind(this);
    this.calcType = this.calcType.bind(this);
    this.saveLoan = this.saveLoan.bind(this);
    
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

 tradeInChange(e){
   const index = e.target.value
   const tradein = this.state.vehicles[index].tradein_value;
   const pay = this.state.vehicles[index].payoff;
   this.setState({
     tradeInValue: tradein || '',
     payoff: pay || '',
     none: '',
   })
 }

 privateSaleChange(e){
  const index = e.target.value
  const privateSale = this.state.vehicles[index].private_sale_value;
  const pay = this.state.vehicles[index].payoff;
  this.setState({
    privateSale: privateSale || '',
    payoff: pay || '',
    none: '',
  })
}

calcType(e){
  this.setState({
    calc: e.target.value,
    payoff: '',
    tradeInValue: '',
    privateSale: '',
  })
}

saveLoan(){
  const payoff = this.state.payoff==''?0: this.state.payoff;
  const privateSale = this.state.privateSale==''?0: this.state.privateSale;
  const tradeInValue = this.state.tradeInValue==''?0: this.state.tradeInValue;
  axios.post(`/api/loan`, {
    name: this.state.name,
    purchasePrice: this.state.purchasePrice,
    cashDown: this.state.cashDown,
    tradeInValue: tradeInValue,
    payoff: payoff,
    privateSale: privateSale,
    loanAmount: this.state.amount,
    interest: this.state.interest,
    payments: this.state.payments
  })
  .then( res =>
    this.props.history.push(`/loan`), 
  )}

  render() {
    const options = this.state.vehicles.map((vehicle,i) => {
      const { private_sale_value, tradein_value, payoff, name } = vehicle;
      return <option key={i} value={i} >{name}</option>;
    });

    

    return (
      <div>
          <label>Do you have a vehicle you are selling?</label>
            <select onChange={ this.calcType }>
              <option value='none'>No</option>
              <option value='privatesale'>Private Sale</option>
              <option value='tradein'>Trade-In</option>
            </select>
          <label>Name:</label>
          <input name='name' onChange={ this.handleChange }/>
          <label>Purchase Price:</label>
          <input name='purchasePrice' onChange={ this.handleChange }/>
          <label>Cash Down:</label>
          <input name='cashDown' onChange={ this.handleChange }/>
          {
            this.state.calc === 'tradein' &&
            <div>
              <label>Trade-in</label>
              <select onChange={ this.tradeInChange }>
                <option value="">Select One</option>
                {options}
              </select>
            </div>
          }
          {
            this.state.calc ==='privatesale' &&
          <div>
            <label>Private Sale</label>
            <select onChange={ this.privateSaleChange } >
              <option value="">Select One</option>
              {options}
            </select>
          </div>
          }
          <label>Tax Rate: </label>
          <input name='taxRate' onChange={this.handleChange}/>
          <label>Annual Interest Rate</label>
          <input name='interest' onChange={ this.handleChange }/>
          <label>Loan Term (in months):</label>
          <input name='payments' onChange={ this.handleChange }/>
          <button onClick={ this.handleCalculate }>Calculate</button>
          <label>Loan Amount:</label>
          { this.state.amount }
          <label>Monthly Payment:</label>
          { this.state.monthly }
          <button onClick={ this.AddLoan }>Save</button>
      </div>
    );
  }
}

export default AddLoan;



