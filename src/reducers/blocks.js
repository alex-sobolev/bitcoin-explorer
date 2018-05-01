import config from '../config';

const { actionTypes } = config;


const blocks = (state=[], action) => {
  switch(action.type) {
    case actionTypes.BLOCKS:
      return action.blocks;

    default:
      return state;
  }
}

export default blocks;
