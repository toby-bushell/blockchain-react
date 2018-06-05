import React, { Component } from 'react';
import AppContext from '../context/app';
import Transactions from './transactions';

class TransactionsProvider extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ address, transactions, updateTransactions }) => (
          <Transactions address={address} transactions={transactions} updateTransactions={updateTransactions} />
        )}
      </AppContext.Consumer>
    );
  }
}

export default TransactionsProvider;
