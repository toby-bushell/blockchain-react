import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import TransactionSend from './send-transaction';

const fs = require('fs');

describe('Transaction Component', () => {
  it('renders correctly', () => {
    const address = 'testAddress';
    const tree = renderer.create(<TransactionSend address={address} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders an address input', () => {
    const address = 'testAddress';
    expect(shallow(<TransactionSend address={address} />).find('input[name="toAddress"]').length).toEqual(1);
  });

  it('renders an amount input field', () => {
    const address = 'testAddress';
    expect(shallow(<TransactionSend address={address} />).find('input[name="amount"]').length).toEqual(1);
  });

  it('sets local error if form submit is empty', () => {
    const address = 'testAddress';

    const wrapper = shallow(<TransactionSend address={address} />);
    wrapper.find('form').simulate('submit', {
      target: {
        value: 'Change function'
      },
      preventDefault() {}
    });

    expect(wrapper.state('errors')).toEqual(expect.anything());
  });

  it('allows inputs saves to state and submits', () => {
    const address = 'testAddress';
    const wrapper = shallow(<TransactionSend address={address} />);

    // Update address and check state reflects
    wrapper.find('input[name="toAddress"]').simulate('change', {
      target: {
        value: 'newValue'
      },
      field: 'toAddress'
    });
    expect(wrapper.state().form.toAddress).toEqual(expect.anything());

    // Update amount and check state reflects
    wrapper.find('input[name="amount"]').simulate('change', {
      target: {
        value: 'newValue'
      },
      field: 'amount'
    });
    expect(wrapper.state().form.amount).toEqual(expect.anything());

    wrapper.instance().sendTransactionToApi = jest.fn(() => {
      console.log('\x1b[32m', 'jest function being called???', '\x1b[0m');
    });
    wrapper.update();

    // console.log(
    //   '\x1b[31m',
    //   'wrapper?',
    //   wrapper.sendTransactionToApi,
    //   wrapper,
    //   wrapper.instance().sendTransactionToApi,
    //   '\x1b[0m'
    // );
    // Check on submit the create transaction is called
    wrapper.find('form').simulate('submit', {
      target: {
        value: 'Change function'
      },
      preventDefault() {}
    });

    expect(wrapper.instance().sendTransactionToApi).toBeCalled();

    // const spy = jest.spyOn(TransactionSend.prototype, 'sendTransactionToApi');
    // wrapper.update();

    // expect(spy).toHaveBeenCalled();
    // expect(sendTransaction).toEqual(expect.anything());
  });
});
// it('renders correctly', () => {

//   // manually trigger the callback
//   tree.props.onSubmit();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
