import React from 'react';
import renderer from 'react-test-renderer';
import Header from './index';
import { shallow, mount, render } from 'enzyme';

it('renders correctly', () => {
  const context = { address: 'testAddress' };
  const wrapper = shallow(<Header />, context);

  expect(wrapper).toMatchSnapshot();
});
