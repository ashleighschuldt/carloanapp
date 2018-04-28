import React, { Component } from 'react';
import axios from 'axios';
import {totalInterest, loanAmount, loanPayment} from '../../lib/util';
import './AddLoan.css';
import Header from '../../Components/Header'

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
      interestPaid: '',
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
    const interestPaid = totalInterest(monthly, this.state.payments, amount)
      this.setState({
        monthly,
        amount,
        interestPaid
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
  axios.post(`/api/loan`, {
    name: this.state.name,
    purchasePrice: this.state.purchasePrice,
    cashDown: this.state.cashDown,
    tradeInValue: this.state.tradeInValue,
    payoff: this.state.payoff,
    privateSale: this.state.privateSale,
    loanAmount: this.state.amount,
    interest: this.state.interest,
    payments: this.state.payments,
    monthly: this.state.monthly,
    taxRate: this.state.taxRate,
    totalInterest: this.state.interestPaid
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
          <Header />
          <div className='newloans'>
          <label>Do you have a vehicle you are selling?</label>
            <select onChange={ this.calcType }>
              <option value='none'>No</option>
              <option value='privatesale'>Private Sale</option>
              <option value='tradein'>Trade-In</option>
            </select>
          <br/>
            <label>Name:</label>
            <input name='name' onChange={ this.handleChange }/>
          <br/>
            <label>Purchase Price:</label>
            <input name='purchasePrice' onChange={ this.handleChange }/>
          <br/>
            <label>Cash Down:</label>
            <input name='cashDown' onChange={ this.handleChange }/>
          {
            this.state.calc === 'tradein' &&
            <div className='conditional'>
              <label>Trade-in</label>
              <select onChange={ this.tradeInChange }>
                <option value="">Select One</option>
                {options}
              </select>
              <b>Trade-In Value:</b> ${this.state.tradeInValue}
              <b>Payoff:</b> ${this.state.payoff}
            </div>
          }
          {
            this.state.calc ==='privatesale' &&
          <div className='conditional'>
            <label>Private Sale</label>
            <select onChange={ this.privateSaleChange } >
              <option value="">Select One</option>
              {options}
            </select>
            <b>Private Sale Value:</b> ${ this.state.privateSale }
            <b>Payoff:</b> ${ this.state.payoff }
          </div>
          }
          <br/>
            <label>Tax Rate: </label>
            <input name='taxRate' onChange={this.handleChange}/>
          <br/>
            <label>Annual Interest Rate</label>
            <input name='interest' onChange={ this.handleChange }/>
          <br/>
            <label>Loan Term (in months):</label>
            <input name='payments' onChange={ this.handleChange }/>
          <br/>
          </div>
          <div className='calculate'>
            <button onClick={ this.handleCalculate }>Calculate</button>
          </div>
          <div className='calc-results'>
            <label>Loan Amount:</label>
            ${ this.state.amount }
            <label>Monthly Payment:</label>
            ${ this.state.monthly }
            <label>Total Interest Paid:</label>
            ${ this.state.interestPaid }
          </div>
          <div className='save'>
            <button onClick={ this.saveLoan }>Save</button>
          </div>  
      </div>
    );
  }
}

export default AddLoan;



