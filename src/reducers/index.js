import { combineReducers } from 'redux';
import enhancedBlocks from './enhancedBlocks';
import blocks from './blocks';

export default combineReducers({
  enhancedBlocks,
  blocks
});
