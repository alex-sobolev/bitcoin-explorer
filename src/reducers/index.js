import { combineReducers } from 'redux';
import enhancedBlocks from './enhancedBlocks';
import blocks from './blocks';
import unconfirmedTransactions from './unconfirmedTransactions';
import block from './block';
import transaction from './transaction';
import selectedTab from './selectedTab';
import splittedBlocks from './splittedBlocks';
import activeBlockPage from './activeBlockPage';

export default combineReducers({
  enhancedBlocks,
  blocks,
  unconfirmedTransactions,
  block,
  transaction,
  selectedTab,
  splittedBlocks,
  activeBlockPage
});
