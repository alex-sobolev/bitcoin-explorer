import config from '../config';

const { actionTypes } = config;

const enhancedBlocks = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ENHANCED_BLOCKS:
      return action.blocks;

    default:
      return state;
  }
};

export default enhancedBlocks;
