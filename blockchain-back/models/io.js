const fs = require('fs');

const saveBlockchainToFile = (blockchain) => {
  try {
    fs.writeFileSync('data/chain.json', JSON.stringify(blockchain));
  } catch (error) {
    console.log(error);
  }
}

const readBlockchainFromFile = () => {
  try {
    const file = fs.readFileSync('data/chain.json', 'utf8')
    if (file === '') {
      return null;
    }
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const savePoolToFile = (transactionPool) => {
  try {
    fs.writeFileSync('data/transaction.json', JSON.stringify(transactionPool));
  } catch (error) {
    console.log(error);
  }
}

const readPoolFromFile = () => {
  try {
    const file = fs.readFileSync('data/transaction.json', 'utf8')
    if (file === '') {
      return null;
    }
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  saveBlockchainToFile,
  readBlockchainFromFile,
  savePoolToFile,
  readPoolFromFile
}
