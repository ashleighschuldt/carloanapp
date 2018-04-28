import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
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
      return (<div key={i} className='vehicle'>
        <b>{this.state.vehicles[i].year}</b> 
        <b>{this.state.vehicles[i].make}</b> 
        <b>{this.state.vehicles[i].model}</b> 
        <b>{this.state.vehicles[i].trim}</b> 
        <b>Trade-in Value:</b> ${this.state.vehicles[i].tradein_value} 
        <b>Private Sale Value:</b> ${this.state.vehicles[i].private_sale_value} 
        <b>Payoff Amount:</b> ${this.state.vehicles[i].payoff} 
        <Link to={`/editvehicle/${this.state.vehicles[i].id}`}><button>Edit</button></Link>
        <button onClick={() => {this.deleteVehicle(e.id)}}>Delete</button>
      </div>)
    })
    return (
      <div >
        <div className='username'>
         { this.props.user.username }'s Vehicles
         </div>
        <Header />
          {vehicles}
        <div className='newvehicle'>
        <Link to={`/newvehicle`}><button> Add New Vehicle </button></Link>
        </div>
          
      </div>
    );
  }
}

export default connect (state => state)(Vehicles);