import config from '../config';
import { splitArr } from '../utils';

const { actionTypes } = config;

const splittedBlockTransactions = (state = [], action) => {
  switch (action.type) {
    case actionTypes.BLOCK:
      return splitArr(action.block.tx, action.limitPerPage);

    default:
      return state;
  }
};

export default splittedBlockTransactions;
