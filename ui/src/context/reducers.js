import React from 'react';

const Reducer = (state, action) => {
  if (action.type === ActionTypes.TOGGLE) {
    return { ...state, isADuck: !state.isADuck };
  }
};

export default Reducer;
