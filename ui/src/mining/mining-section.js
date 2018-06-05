import React, { Component, Fragment } from 'react';
import { StartMining } from '../api';
import socketIOClient from 'socket.io-client';
import { MiningSectionDiv, BlockInfoDiv, MiningButton } from './styles';
import PickAxeSVG from './pickaxe';
import { Link } from 'react-router-dom';
import AppContext from '../context/app';
import { Button } from '../styles/index';
import { getBalance } from '../api';
import PropTypes from 'prop-types';

class MiningSection extends Component {
  constructor() {
    super();
    this.state = {
      mining: false,
      minedBlock: false,
      socket: null
    };

    this.MiningButtonClick = this.MiningButtonClick.bind(this);
    this.startMining = this.startMining.bind(this);
  }

  MiningButtonClick() {
    if (this.state.mining) return;
    this.startMining();
  }

  startMining() {
    const { address, updateBalance } = this.props;
    const endpoint = 'http://localhost:3000/';
    const socket = socketIOClient(endpoint, { query: `address=${address}` });

    socket.on('connect', callback => {
      console.log('client connected', callback);
    });

    socket.on('miningStarted', (mining, callback) => {
      console.log('mining started received');

      getBalance(address).then(balance => {
        updateBalance(balance);
      });
      this.setState({
        mining,
        socket: socket
      });

      callback('mining animation started');
    });

    socket.on('miningFinished', data => {
      console.log('miningFinished', data);

      this.setState({
        mining: false,
        minedBlock: data
      });
    });

    socket.on('miningError', message => {
      console.log('error occured', message);
    });

    socket.on('disconnected', () => {
      console.log('disconnected on client');

      this.setState({
        mining: false
      });
    });
  }

  render() {
    const blockMinedStatus = this.state.minedBlock ? 'Block Mined' : 'Mined block info to appear here';
    const { address, updateBalance } = this.props;

    return (
      <MiningSectionDiv>
        <div>
          <PickAxeSVG animate={this.state.mining} />
          <MiningButton onClick={this.MiningButtonClick}>
            {this.state.mining ? 'mining...' : 'start mining'}
          </MiningButton>
        </div>
        <BlockInfoDiv mined={this.state.minedBlock}>
          <h3>{blockMinedStatus}</h3>
          {this.state.minedBlock && (
            <p>
              {`${this.state.minedBlock.hash}, take a look in `}
              <Link to={'/transactions/'}>transactions</Link>
            </p>
          )}
        </BlockInfoDiv>
      </MiningSectionDiv>
    );
  }
}

MiningSection.propTypes = {
  address: PropTypes.string.isRequired,
  updateBalance: PropTypes.func.isRequired
};

export default MiningSection;
