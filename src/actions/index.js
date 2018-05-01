import config from '../config/index';
// import uniqid from 'uniqid';
import api from '../services/api';

const { actionTypes } = config;

export const enhancedBlocksRequested = limit => async dispatch => {
  const blocksHashes = await api.getTodaysBlocksHashes(limit);
  const blocks = await api.getTodaysEnhancedBlocks(blocksHashes);

  dispatch({
    type: actionTypes.ENHANCED_BLOCKS,
    blocks
  });
};

export const blocksRequested = () => async dispatch => {
  const blocks = await api.getTodaysBlocks();

  dispatch({
    type: actionTypes.BLOCKS,
    blocks
  });
};

export const unconfirmedTransactionsRequested = (limit=10) => async dispatch => {
  const transactions = await api.getUnconfirmedTransactions(limit);

  dispatch({
    type: actionTypes.UNCONFIRMED_TRANSACTIONS,
    transactions
  })
}
