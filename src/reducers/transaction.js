import config from '../config';

const { actionTypes } = config;

const transaction = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.TRANSACTION:
      return action.transaction;

    default:
      return state;
  }
};

export default transaction;
