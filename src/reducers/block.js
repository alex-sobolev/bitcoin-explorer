import config from '../config';

const { actionTypes } = config;

const block = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.BLOCK:
      return action.block;

    default:
      return state;
  }
};

export default block;
