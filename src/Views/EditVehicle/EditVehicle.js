import React, { Component } from 'react';
import Header from '../../Components/Header';
import './EditVehicle.css';
import axios from 'axios';

class EditVehicle extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

componentWillMount(){
    axios.get(`/api/vehicles/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                vehicle: response.data
        // name: response.data.name,        
        // year: response.data.year, 
        // make: response.data.make,
        // model: response.data.model,
        // trim: response.data.trim,
        // tradein_value: response.data.tradein_value,
        // private_sale_value: response.data.private_sale_value,
        // payoff: response.data.payoff
            })
        })
}    
  render() {
    return (
      <div >
          <Header />
          <label>Name:</label>
          <input value={this.state.name}/>
          <label>Year:</label>
          <input value={this.state.year}/>
          <label>Make:</label>
          <input value={this.state.make}/>
          <label>Model:</label>  
          <input value={this.state.model}/>
          <label>Trim:</label>
          <input value={this.state.trim}/>
          <label>Trade-in Value:</label>
          <input value={this.state.tradein_value}/>
          <label>Private Sale Value:</label>
          <input value={this.state.private_sale_value}/>
          <label>Payoff Value:</label>
          <input value={this.state.payoff}/>
      </div>
    );
  }
}

export default EditVehicle;