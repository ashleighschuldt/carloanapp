import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Vehicles.css';

class Vehicles extends Component {
    constructor(props){
      super(props);
      this.state = {
        vehicles: [],
        
      }
      this.deleteVehicle = this.deleteVehicle.bind(this);
    }

componentWillMount(){
    axios.get(`/api/vehicles`)
      .then(response => {
        this.setState({
          vehicles: response.data
        })
      })
}
deleteVehicle(id){
  axios.delete(`/api/vehicles/${id}`)
    .then(res => {
      this.setState({
        vehicles: res.data
      })
    })
} 

  render() {
    const vehicles = this.state.vehicles.map((e,i) => {
      return (<div key={i}>
        {this.state.vehicles[i].year}
        {this.state.vehicles[i].make}
        {this.state.vehicles[i].model}
        {this.state.vehicles[i].trim}
        {this.state.vehicles[i].tradein_value}
        {this.state.vehicles[i].private_sale_value}
        {this.state.vehicles[i].payoff}
        <Link to={`/editvehicle/${this.state.vehicles[i].id}`}><button>Edit</button></Link>
        <button onClick={() => {this.deleteVehicle(e.id)}}>Delete</button>
      </div>)
    })
    return (
      <div >
         `{ this.props.user.username }'s Vehicles'`
        <Header />
        <Link to={`/newvehicle`}><button> Add New Vehicle </button></Link>
          {vehicles}
          
      </div>
    );
  }
}

export default connect (state => state)(Vehicles);