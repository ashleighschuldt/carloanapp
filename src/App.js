import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Dashboard from './Views/Dashboard/Dashboard';
import Vehicles from './Views/Vehicles/Vehicles';
import AddVehicle from './Views/AddVehicle/AddVehicle';
import EditVehicle from './Views/EditVehicle/EditVehicle';
import Loans from './Views/Loans/Loans';
import AddLoan from './Views/AddLoan/AddLoan';


class App extends Component {
  render() {
    return (
      <div >
        <Router>
          <Switch>
              <Route path={`/register`} component={ Register }/>
              <Route path={`/dashboard`} component={ Dashboard }/>
              <Route path={`/vehicles`} component={ Vehicles }/>
              <Route path={`/editvehicle/:id`} component= {EditVehicle}/>
              <Route path={`/newvehicle`} component={ AddVehicle }/>
              <Route path={`/loan`} component={ Loans }/>
              <Route path={`/newloan`} component={ AddLoan }/>
              <Route path={`/`} component={ Login }/>
          </Switch>
        </Router>
     
      </div>
    );
  }
}

export default App;
