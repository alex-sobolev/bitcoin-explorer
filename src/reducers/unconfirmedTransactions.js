import config from '../config';

const { actionTypes } = config;

const unconfirmedTransactions = (state = [], action) => {
  switch(action.type) {
    case actionTypes.UNCONFIRMED_TRANSACTIONS:
      return action.transactions;

    default:
      return state;
  }
};

export default unconfirmedTransactions;
