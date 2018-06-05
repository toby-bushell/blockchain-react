import React from 'react';

const state = {
  address: 'test-addresss',
  updateAddress: () => {},
  transactions: {},
  updateTransactions: () => {},
  balance: {},
  updateBalance: () => {}
};

const AppContext = React.createContext(state); // passing initial value

export default AppContext;
