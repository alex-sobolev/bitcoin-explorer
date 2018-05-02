import { combineReducers } from 'redux';
import enhancedBlocks from './enhancedBlocks';
import blocks from './blocks';
import unconfirmedTransactions from './unconfirmedTransactions';
import block from './block';
import transaction from './transaction';

export default combineReducers({
  enhancedBlocks,
  blocks,
  unconfirmedTransactions,
  block,
  transaction
});
