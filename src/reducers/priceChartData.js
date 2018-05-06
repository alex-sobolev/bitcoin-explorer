import config from '../config';

const { actionTypes } = config;

const priceChartData = (state={}, action) => {
  switch(action.type) {
    case actionTypes.PRICE_CHART:
      return action.priceData;
    default:
      return state;
  }
}

export default priceChartData;
