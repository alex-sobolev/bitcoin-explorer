import config from '../config';

const { actionTypes } = config;

const selectedTab = (state='home', action) => {
  switch(action.type) {
    case actionTypes.TAB_SELECTED:
      return action.tab;

    default:
      return state;
  }
}

export default selectedTab;
