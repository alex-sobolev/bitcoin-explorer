import config from '../config/index';
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

export const blocksRequested = limitPerPage => async dispatch => {
  const blocks = await api.getTodaysBlocks();

  dispatch({
    type: actionTypes.BLOCKS,
    blocks,
    limitPerPage
  });
};

export const unconfirmedTransactionsRequested = (limit = 10) => async dispatch => {
  const transactions = await api.getUnconfirmedTransactions(limit);

  dispatch({
    type: actionTypes.UNCONFIRMED_TRANSACTIONS,
    transactions
  });
};

export const blockDetailsRequested = param => async dispatch => {
  const block =
    param.length === 6
      ? await api.getSingleBlockDetailsByHeight(Number(param))
      : await api.getSingleBlockDetailsByHash(param);

  dispatch({
    type: actionTypes.BLOCK,
    block
  });
};

export const transactionDetailsRequested = txHash => async dispatch => {
  const transaction = await api.getSingleTransactionDetailsByHash(txHash);

  dispatch({
    type: actionTypes.TRANSACTION,
    transaction
  });
};

export const tabSelected = tab => ({
  type: actionTypes.TAB_SELECTED,
  tab
});

export const activeBlockPageUpdated = pageNumber => ({
  type: actionTypes.ACTIVE_BLOCK_PAGE,
  pageNumber
});

export const activeBlockTransactionsPageUpdated = pageNumber => ({
  type: actionTypes.ACTIVE_BLOCK_TRANSACTIONS_PAGE,
  pageNumber
});
