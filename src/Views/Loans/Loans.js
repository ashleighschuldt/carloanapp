import React, { Component } from 'react';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './Loans.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    // const loans = this.state.loans.map((e,i) => {
    //   return (<div key={i} className='loans'>
    //     <b>{this.state.loans[i].name}</b>
    //     <b>Amount:</b> ${this.state.loans[i].loan_amount}
    //     <b>Payment:</b> ${this.state.loans[i].monthly_payment}
    //     <b>Interest Paid:</b>${this.state.loans[i].total_interest}
    //     <button onClick={() => {this.deleteLoan(e.id)}}>Delete</button>
    //   </div>)
    // })
    const { loans } = this.state;

    return (
      <div >
        <div className='username'>
        { this.props.user.username }'s Loans
        </div>
        <Header />
          <div className='loan-table'>
            <ReactTable
            data = { loans }
            noDataText="Add a loan. Click Add New Loan"
            
            columns={[
              {
                Header: 'Loans',
                columns: [
                  {
                    Header: "Name",
                    accessor: 'name'
                },
                  {
                    Header: "Amount",
                    accessor: 'loan_amount'
                  },
                  {
                    Header: "Payment",
                    accessor: 'monthly_payment'
                  },
                  {
                    Header:'Interest Paid',
                    accessor: 'total_interest'
                  },
                  {
                    Header: '',
                    Cell: row => (
                      <div>
                        <button onClick={() => {this.deleteLoan(row.original.id)}}>Delete</button>
                      </div>
                    )
                  }
                ]  
            }
            ]}
            defaultSorted={[
              {
                id: "monthly_payment",
                desc: true
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            />
          </div>
          <div className='newloan'>
          <Link to={`/newloan`}><button>Add New Loan</button></Link>
          </div>
      </div>
    );
  }
}

export default connect (state => state)(Loans);