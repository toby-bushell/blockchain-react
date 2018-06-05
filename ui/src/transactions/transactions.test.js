import React from 'react';
import renderer from 'react-test-renderer';
import Transactions from './transactions';

it('renders correctly', () => {
  const transactionsDummy = {
    sent: [
      {
        fromAddress: 'XIbniDmR0IBL4ohswo2S',
        toAddress: '21421421',
        amount: '10'
      },
      {
        fromAddress: 'XIbniDmR0IBL4ohswo2S',
        toAddress: 'tobbyyy',
        amount: '200'
      }
    ],
    received: [
      {
        fromAddress: null,
        toAddress: 'XIbniDmR0IBL4ohswo2S',
        amount: 100
      },
      {
        fromAddress: null,
        toAddress: 'XIbniDmR0IBL4ohswo2S',
        amount: 100
      },
      {
        fromAddress: null,
        toAddress: 'XIbniDmR0IBL4ohswo2S',
        amount: 100
      }
    ]
  };
  const tree = renderer.create(<Transactions transactions={transactionsDummy} />).toJSON();

  expect(tree).toMatchSnapshot();
});
