import React, { Component } from 'react';
import Header from '../../Components/Header';
import axios from 'axios';

import './AddVehicle.css';

class AddVehicle extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      this.AddVehicle = this.AddVehicle.bind(this);
    }

    handleChange(e){
      this.setState({
        [e.target.name]: e.target.value,
      })  
    }

    AddVehicle(){
      axios.post(`/api/vehicles`, {
        name: this.state.vehicleName,
        year: this.state.year,
        make: this.state.make,
        model: this.state.model,
        trim: this.state.trim,
        privateSaleValue: this.state.privateSaleValue,
        tradeInValue: this.state.tradeInValue,
        payoffValue: this.state.payoffValue
      })
      .then( res =>
      this.props.history.push(`/dashboard`),
    )
    } 

  render() {
    return (
      <div >
        <Header />
        <label>Vehicle Name: </label>
        <input name='vehicleName' onChange={ this.handleChange }/>
        <label>Year:</label>
        <input name='year' onChange={ this.handleChange }/>
        <label>Make:</label>
        <input name='make' onChange={ this.handleChange }/>
        <label>Model:</label>
        <input name='model' onChange={ this.handleChange }/>
        <label>Trim:</label>
        <input name='trim' onChange={ this.handleChange }/>
        <label>Private Sale Value:</label>
        <input name='privateSaleValue' onChange={ this.handleChange }/>
        <label>Trade-in Value:</label>
        <input name='tradeInValue' onChange={ this.handleChange }/>
        <label>Payoff Value:</label>
        <input name='payoffValue' onChange={ this.handleChange }/>
        <button onClick={ this.AddVehicle }>Save</button>
        <button>Cancel</button>
      </div>
    );
  }
}

export default AddVehicle;