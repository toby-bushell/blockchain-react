import React, { Component, Fragment } from 'react';
import AppContext from '../context/app';

import MiningSection from './mining-section';
class Mining extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ address, updateBalance }) => <MiningSection address={address} updateBalance={updateBalance} />}
      </AppContext.Consumer>
    );
  }
}

export default Mining;
