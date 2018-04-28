import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Loans.css';

class Loans extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit: '',
      loans: []
    }
    this.deleteLoan = this.deleteLoan.bind(this);
  }

  componentWillMount(){
    axios.get(`/api/loans`)
      .then( response => {
        this.setState({
          loans: response.data
        })
      })
  }

  deleteLoan(id){
    axios.delete(`/api/loan/${id}`)
      .then(res => {
        this.setState({
          loans: res.data
        })
      })
  } 

  render() {
    const loans = this.state.loans.map((e,i) => {
      return (<div key={i}>
        {this.state.loans[i].name}
        Amount {this.state.loans[i].loan_amount}
        Payment {this.state.loans[i].monthly_payment}
        Term {this.state.loans[i].loan_term/12} years
        <button onClick={() => {this.deleteLoan(e.id)}}>Delete</button>
      </div>)
    })
    return (
      <div >
        { this.props.user.username }'s Loans
        <Header />
          Loans
          <Link to={`/newloan`}><button>Add New</button></Link>
          {loans}
      </div>
    );
  }
}

export default connect (state => state)(Loans);