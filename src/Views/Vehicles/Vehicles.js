import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Vehicles.css';

class Vehicles extends Component {
    constructor(props){
      super(props);
      this.state = {
        vehicles: []
      }
    }

componentWillMount(){
    axios.get(`/api/vehicles`)
      .then(response => {
        this.setState({
          vehicles: response.data
        })
      })
}    
  render() {
    const vehicles = this.state.vehicles.map((e,i) => {
      return (<div key={i}>


      </div>)
    })
    return (
      <div >
         `{ this.props.user.username }'s Vehicles'`
         <Link to={`/`}>Logout</Link>
        <Header />
          Vehicles
          
      </div>
    );
  }
}

export default Vehicles;