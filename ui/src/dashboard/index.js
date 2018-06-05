import React, { Component } from 'react';
import AppContext from '../context/app';
import TransactionList from '../transactions';
import Balance from '../balance';

class Dashboard extends Component {
  render() {
    console.log('Address context', AppContext);

    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;
