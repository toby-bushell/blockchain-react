import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import AddressGenerator from './index';

const fs = require('fs');

it('renders correctly', () => {
  const context = {
    address: 'testaddress',
    updateAddress: jest.fn(() => {
      console.log('\x1b[34m', 'update address called', '\x1b[0m');
    })
  };
  const wrapper = shallow(<AddressGenerator />, context);
  expect(tree).toMatchSnapshot();
});
