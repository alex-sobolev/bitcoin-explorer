import config from '../config';
import { splitArr } from '../utils';

const { actionTypes } = config;

const splittedBlocks = (state = [], action) => {
  switch (action.type) {
    case actionTypes.BLOCKS:
      return splitArr (action.blocks, action.limitPerPage);

    default:
      return state;
  }
};

export default splittedBlocks;
