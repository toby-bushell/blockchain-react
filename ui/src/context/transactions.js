import React from 'react';

const state = {
  address: 'test-addresss',
  updateAddress: () => {}
};

const TransactionsContext = React.createContext(state); // passing initial value

export default TransactionsContext;
