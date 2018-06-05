import React, { Component } from 'react';
import AppContext from '../context/app';
import { getTransactions } from '../api';
import PropTypes from 'prop-types';

// Styles
import { TransactionTable, NoTransactionMessage } from './styles';

const TransactionsList = ({ items }) => {
  const listItems = items.map((item, i) => (
    <tr key={i}>
      <td>{item.toAddress}</td>
      <td>{item.fromAddress ? item.fromAddress : '(mining reward)'}</td>
      <td>{item.amount}</td>
    </tr>
  ));
  if (items.length > 0) {
    return (
      <TransactionTable>
        <thead>
          <tr>
            <th>To Address</th>
            <th>From Address</th>
            <th>Amount (tbc)</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </TransactionTable>
    );
  }
  return <NoTransactionMessage>No Transactions</NoTransactionMessage>;
};

TransactionsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TransactionsList;
