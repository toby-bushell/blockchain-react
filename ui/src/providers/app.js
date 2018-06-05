import React, { Component } from 'react';
import AppContext from '../context/app';

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.updateAddress = this.updateAddress.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    this.updateBalance = this.updateBalance.bind(this);

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      address: 'XIbniDmR0IBL4ohswo2S',
      updateAddress: this.updateAddress,
      transactions: {},
      updateTransactions: this.updateTransactions,
      balance: 0,
      updateBalance: this.updateBalance
    };
  }

  updateAddress(address) {
    if (address.length < 1) return;

    this.setState(state => ({
      address
    }));
  }

  updateTransactions(transactions) {
    if (!transactions) return;

    // console.log('updating transactions', transactions);

    this.setState(state => ({
      transactions
    }));
  }

  updateBalance(balance) {
    if (!balance) return;

    // console.log('updating balance', balance);

    this.setState(state => ({
      balance
    }));
  }

  render() {
    return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
  }
}

export default AppProvider;
