import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import MiningSection from './mining-section';

it('renders correctly', () => {
  const address = 'testaddress';
  const updateBalance = jest.fn();
  const tree = renderer.create(<MiningSection address={address} updateBalance={updateBalance} />);

  expect(tree).toMatchSnapshot();
});

it('triggers mining call on click', () => {
  const address = 'testaddress';
  const updateBalance = jest.fn();
  const wrapper = shallow(<MiningSection address={address} updateBalance={updateBalance} />);
  wrapper.instance().startMining = jest.fn();

  // expect(wrapper.find(Bar).dive().find('.in-bar')).to.have.length(1);
  wrapper.find('MiningButton').simulate('click');

  expect(wrapper.instance().startMining).toBeCalledWith();
});
