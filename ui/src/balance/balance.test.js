import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Balance from './balance';

it('renders correctly', () => {
  const balance = 100;
  const tree = renderer.create(<Balance balance={balance} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders balance passed to it', () => {
  const balance = 100;
  const wrapper = shallow(<Balance balance={balance} />);

  expect(wrapper.text()).toBe(balance.toString());
});
