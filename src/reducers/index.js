import { combineReducers } from 'redux';
import enhancedBlocks from './enhancedBlocks';
import blocks from './blocks';
import unconfirmedTransactions from './unconfirmedTransactions';

export default combineReducers({
  enhancedBlocks,
  blocks,
  unconfirmedTransactions
});
