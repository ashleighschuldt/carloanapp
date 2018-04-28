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
      return (<div key={i} className='loans'>
        <b>{this.state.loans[i].name}</b>
        <b>Amount:</b> ${this.state.loans[i].loan_amount}
        <b>Payment:</b> ${this.state.loans[i].monthly_payment}
        <b>{this.state.loans[i].loan_term/12} years</b>
        <button onClick={() => {this.deleteLoan(e.id)}}>Delete</button>
      </div>)
    })
    return (
      <div >
        <div className='username'>
        { this.props.user.username }'s Loans
        </div>
        <Header />
          {loans}
          <div className='newloan'>
          <Link to={`/newloan`}><button>Add New Loan</button></Link>
          </div>
      </div>
    );
  }
}

export default connect (state => state)(Loans);