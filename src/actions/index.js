import config from '../config';
// import uniqid from 'uniqid';
import api from '../services/api';

const { actionTypes } = config;

export const testTypeReceived = () => ({
  type: actionTypes.testType,
});

export const enhancedBlocksRequested = () => async (dispatch) => {
    const blocksHashes = await api.getTodaysBlocksHashes(5);
    const blocks = await api.getTodaysEnhancedBlocks(blocksHashes);

    dispatch({
      type: actionTypes.ENHANCED_BLOCKS_RECEIVED,
      blocks
    });
  };

export const blocksRequested = () =>
  async (dispatch) => {
    const blocks = await api.getTodaysBlocks();

    dispatch({
      type: actionTypes.BLOCKS_RECEIVED,
      blocks
    });
  };
