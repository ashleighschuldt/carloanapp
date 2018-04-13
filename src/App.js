import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Welcome from './Views/Welcome/Welcome';
import Dashboard from './Views/Dashboard/Dashboard';
import Vehicles from './Views/Vehicles/Vehicles';
import AddVehicle from './Views/AddVehicle/AddVehicle';
import Loans from './Views/Loans/Loans';
import AddLoan from './Views/AddLoan/AddLoan';

class App extends Component {
  render() {
    return (
      <div >
        <Router>
          <Switch>
              <Route path={`/`} component={ Login }/>
              <Route path={`/register`} component={ Register }/>
              <Route path={`/welcome`} component={ Welcome }/>
              <Route path={`/dashboard`} component={ Dashboard }/>
              <Route path={`/vehicles`} component={ Vehicles }/>
              <Route path={`/newvehicle`} component={ AddVehicle }/>
              <Route path={`/loan`} component={ Loans }/>
              <Route path={`/newloan`} component={ AddLoan }/>
          </Switch>
        </Router>
     
      </div>
    );
  }
}

export default App;
