const CryptoJS = require('crypto-js');

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
}

Block.prototype.calculateHash = (index, previousHash, timestamp, data) => {
  return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
}

Block.prototype.getLatestBlock = () => {

}

Block.prototype.generateBlock = (blockData) => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = new Date().getTime() / 1000;
  const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
}

Block.prototype.getGenesisBlock = () => {
  return new Block(0, "0", new Date().getTime / 1000, "This is my genesis block",
    "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"
  );
}

Block.prototype.calculateHashForBlock = (block) => {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
}

Block.prototype.isValidNewBlock = (newBlock, previousBlock) => {
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

export default Block;