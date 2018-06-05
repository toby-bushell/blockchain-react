import React, { Component } from 'react';
import AppContext from '../context/app';
import SendTransaction from './send-transaction';

class TransactionsProvider extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ address, transactions, updateTransactions }) => (
          <SendTransaction address={address} transactions={transactions} updateTransactions={updateTransactions} />
        )}
      </AppContext.Consumer>
    );
  }
}

export default TransactionsProvider;
