import axios from 'axios';
import { path } from 'ramda';

const getTodaysBlocksHashes = async (limit=5) => {
  const currentTime = Date.now();

  try {
    const latestBlocks = await axios.get(`https://blockchain.info/blocks/${currentTime}?format=json`);
    const blocks = path(['data', 'blocks'], latestBlocks) || [];
    const blocksToProcess = blocks.length > limit ? blocks.slice(0, limit) : blocks;

    return blocksToProcess.map(block => block.hash);
  } catch(err) {
    throw new Error(`Could not get list of today blocks by hashes: ${err}`);
  }
};

const getSingleBlockDetailsByHash = async (blockHash = '') => {
  try {
    const block = await axios.get(`https://blockchain.info/rawblock/${blockHash}`);

    return block;
  } catch(err) {
    throw new Error(`Could not get block details for block hash ${blockHash}: ${err}`);
  }
};

const getTodaysEnhancedBlocks = (blockHashes = []) => {
  const blocksPromised = blockHashes.map(getSingleBlockDetailsByHash);

  return Promise.all(blocksPromised).then(blocks => blocks.map(block => block.data));
};

const getTodaysBlocks = async () => {
  const currentTime = Date.now();

  try {
    const data = await axios.get(`https://blockchain.info/blocks/${currentTime}?format=json`);
    const blocks = path(['data', 'blocks'], data);

    return blocks;
  } catch(err) {
    throw new Error(`Could not get blocks: ${err}`);
  }
};

const get24HourBitcoinStats = async() => {
  const stats = await axios.get('https://api.blockchain.info/stats');

  return stats;
};

const getLatestBlock = async() => {
  try {
    const block = await axios.get('https://blockchain.info/latestblock');

    return block;
  } catch(err) {
    throw new Error(`Could not get latest block: ${err}`);
  }
};

const getUnconfirmedTransactions = async(limit=5) => {
  try {
    const data = await axios.get('https://blockchain.info/unconfirmed-transactions?format=json');
    const txsPath = ['data','txs'];
    const txs = path(txsPath, data);

    return txs.length > limit ? txs.slice(0, limit) : txs;
  } catch(err) {
    throw new Error(`Could not get latest transactions: ${err}`);
  }
}

const api = {
  getTodaysBlocksHashes,
  getSingleBlockDetailsByHash,
  getTodaysEnhancedBlocks,
  get24HourBitcoinStats,
  getTodaysBlocks,
  getLatestBlock,
  getUnconfirmedTransactions
};

export default api;
