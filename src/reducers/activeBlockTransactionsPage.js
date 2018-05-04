import config from '../config';

const { actionTypes } = config;

const activeBlockTransactionPage = (state=1, action) => {
  switch(action.type) {
    case actionTypes.ACTIVE_BLOCK_TRANSACTIONS_PAGE:
      return action.pageNumber;

    default:
      return state;
  }
};

export default activeBlockTransactionPage;
