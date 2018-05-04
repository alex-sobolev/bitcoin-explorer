import config from '../config';

const { actionTypes } = config;

const activeBlockPage = (state=1, action) => {
  switch(action.type) {
    case actionTypes.ACTIVE_BLOCK_PAGE:
      return action.pageNumber;

    default:
      return state;
  }
};

export default activeBlockPage;
