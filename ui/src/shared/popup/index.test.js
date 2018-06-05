import React from 'react';
import renderer from 'react-test-renderer';
import Popup from './index';
import { shallow, mount, render } from 'enzyme';
import 'jest-styled-components';

// Popup component uses a render array. Values are passed in a render prop and is required

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Popup
        render={() => {
          <p>Firing</p>;
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('if close button clicked updates state and hides', () => {
  const wrapper = shallow(
    <Popup
      render={close => (
        <div>
          <p>Firing</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    />
  );
  wrapper.find('button').simulate('click');

  expect(wrapper.state('active')).toEqual(false);
  expect(wrapper).toHaveStyleRule('display', 'none');
});
