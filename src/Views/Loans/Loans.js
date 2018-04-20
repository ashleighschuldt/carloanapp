import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Loans.css';

class Loans extends Component {
  constructor(props){
    super(props);
    this.state = {
      loans: []
    }
  }

  componentWillMount(){
    axios.get(`/api/loans`)
      .then( response => {
        this.setState({
          loans: response.data
        })
      })
  }
  render() {
    return (
      <div >
        { this.props.user.username }'s Loans
        <Header />
          Loans
          <Link to={`/newloan`}><button>Add New</button></Link>
      </div>
    );
  }
}

export default connect (state => state)(Loans);