import React, { Component } from 'react';
import AppContext from '../context/app';
import { getTransactions } from '../api';
import TransactionsList from './transactions-list';
import PropTypes from 'prop-types';

// Styles
import { TransactionWrapper } from './styles';

class Transactions extends Component {
  componentDidMount() {
    const { address, updateTransactions } = this.props;
    if (!address) return;

    getTransactions(address).then(transactions => {
      updateTransactions(transactions);
    });
  }
  render() {
    const transactions = this.props.transactions;

    return (
      <div>
        {transactions.hasOwnProperty('received') && (
          <TransactionWrapper>
            <h3>Received</h3>
            <TransactionsList items={transactions.received} />
          </TransactionWrapper>
        )}
        {transactions.hasOwnProperty('sent') && (
          <TransactionWrapper>
            <h3>Sent</h3>
            <TransactionsList items={transactions.sent} />
          </TransactionWrapper>
        )}
      </div>
    );
  }
}

Transactions.propTypes = {
  address: PropTypes.string,
  transactions: PropTypes.object.isRequired,
  updateTransactions: PropTypes.func
};

export default Transactions;
