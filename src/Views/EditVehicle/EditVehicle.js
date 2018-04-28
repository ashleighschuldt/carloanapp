import React, { Component } from 'react';
import Header from '../../Components/Header';
import './EditVehicle.css';
import axios from 'axios';

class EditVehicle extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            year: '',
            make: '',
            model: '',
            trim: '',
            tradeInValue: '',
            privateSaleValue: '',
            payoff: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.editVehicle = this.editVehicle.bind(this);
    }

componentDidMount(){
    axios.get(`/api/vehicles/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                
        name: response.data[0].name,        
        year: response.data[0].year, 
        make: response.data[0].make,
        model: response.data[0].model,
        trim: response.data[0].trim,
        tradeInValue: response.data[0].tradein_value,
        privateSaleValue: response.data[0].private_sale_value,
        payoff: response.data[0].payoff
            })
        })
}

handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })  
  }

  editVehicle(){
    axios.put(`/api/vehicles/${this.props.match.params.id}`, {
      name: this.state.name,
      year: this.state.year,
      make: this.state.make,
      model: this.state.model,
      trim: this.state.trim,
      privateSaleValue: this.state.privateSaleValue,
      tradeInValue: this.state.tradeInValue,
      payoffValue: this.state.payoff
    })
    .then( res =>
    this.props.history.push(`/vehicles`),
  )
  } 

  render() {
    return (
      <div >
          <Header />
          <label>Name:</label>
          <input value={this.state.name} name='name' onChange={ this.handleChange }/>
          <label>Year:</label>
          <input value={this.state.year} name='year' onChange={ this.handleChange }/>
          <label>Make:</label>
          <input value={this.state.make} name='make' onChange={ this.handleChange }/>
          <label>Model:</label>  
          <input value={this.state.model} name='model' onChange={ this.handleChange }/>
          <label>Trim:</label>
          <input value={this.state.trim} name='trim' onChange={ this.handleChange }/>
          <label>Trade-in Value:</label>
          <input value={this.state.tradeInValue} name='tradeInValue' onChange={ this.handleChange }/>
          <label>Private Sale Value:</label>
          <input value={this.state.privateSaleValue} name='privateSaleValue' onChange={ this.handleChange }/>
          <label>Payoff Value:</label>
          <input value={this.state.payoff} name='payoff' onChange={ this.handleChange }/>
          <button onClick={ this.editVehicle }>Save</button>
      </div>
    );
  }
}

export default EditVehicle;