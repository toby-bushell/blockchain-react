import React, { Component, Fragment } from 'react';
import { getBalance } from '../api';
import PropTypes from 'prop-types';

class Balance extends Component {
  componentDidMount() {
    const { balance, updateBalance, address } = this.props;
    console.log('this props', this.props);

    if (!address) return;

    getBalance(address).then(balance => {
      console.log('balance received back', balance);

      updateBalance(balance);
    });
  }

  render() {
    const { balance } = this.props;
    console.log('proppps', this.props);

    return <Fragment>{balance}</Fragment>;
  }
}

Balance.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.number.isRequired,
  updateBalance: PropTypes.func
};

export default Balance;
