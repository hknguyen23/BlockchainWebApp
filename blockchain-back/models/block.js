const CryptoJS = require('crypto-js');
const hexToBinary = require('hex-to-binary');
const { readBlockchainFromFile } = require('../utils/helper');

class Block {
  constructor(index, hash, previousHash, timestamp, data, difficulty, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

const blockchain = readBlockchainFromFile();

// in seconds
const BLOCK_GENERATION_INTERVAL = 10;

// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

const calculateHash = (index, previousHash, timestamp, data, difficulty, nonce) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
}

const getLatestBlock = () => {
  return blockchain[blockchain.length - 1];
}

const getBlockchain = () => {
  return blockchain;
}

const generateBlock = (blockData) => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = new Date().getTime() / 1000;
  const difficulty = getDifficulty(getBlockchain());
  return findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
}

const getGenesisBlock = () => {
  return new Block(
    0, '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7', '', '2021-01-01 10:10:10', '', 10, 0
  );
}

const calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);
}

const isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('invalid index');
    return false;
  }

  if (previousBlock.hash !== newBlock.previousHash) {
    console.log('invalid previousHash');
    return false;
  }

  if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log('invalid hash');
    return false;
  }

  return true;
}

const isValidChain = (blockChain) => {
  console.log(blockChain);
  if (JSON.stringify(blockChain[0]) !== JSON.stringify(getGenesisBlock())) {
    return false;
  }

  const tempBlocks = [blockChain[0]];
  for (let i = 1; i < blockChain.length; i++) {
    if (isValidNewBlock(blockChain[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockChain[i]);
    } else {
      return false;
    }
  }

  return true;
}

const getAdjustedDifficulty = (latestBlock, chain) => {
  const prevAdjustmentBlock = chain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
  const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
  const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
  if (timeTaken < timeExpected / 2) {
    return prevAdjustmentBlock.difficulty + 1;
  } else if (timeTaken > timeExpected * 2) {
    return prevAdjustmentBlock.difficulty > 0 ? prevAdjustmentBlock.difficulty - 1 : 0;
  } else {
    return prevAdjustmentBlock.difficulty;
  }
}

const getDifficulty = (chain) => {
  const latestBlock = chain[blockchain.length - 1];
  if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
    return getAdjustedDifficulty(latestBlock, chain);
  } else {
    return latestBlock.difficulty;
  }
}

const hashMatchesDifficulty = (hash, difficulty) => {
  const hashInBinary = hexToBinary(hash);
  const requiredPrefix = '0'.repeat(Number(difficulty));
  return hashInBinary.startsWith(requiredPrefix);
}

const findBlock = (index, previousHash, timestamp, data, difficulty) => {
  let nonce = 0;
  while (true) {
    const hash = calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
    if (hashMatchesDifficulty(hash, difficulty)) {
      return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
    }
    nonce++;
  }
}

module.exports = {
  generateBlock,
  getBlockchain,
  isValidChain
}