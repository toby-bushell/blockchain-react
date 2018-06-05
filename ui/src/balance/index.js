import React, { Component } from 'react';
import AppContext from '../context/app';
import Balance from './balance';

const BalanceProvider = () => (
  <AppContext.Consumer>
    {({ address, balance, updateBalance }) => (
      <Balance address={address} balance={balance} updateBalance={updateBalance} />
    )}
  </AppContext.Consumer>
);

export default BalanceProvider;
