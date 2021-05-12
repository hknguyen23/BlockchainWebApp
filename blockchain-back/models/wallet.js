const CryptoJS = require("crypto-js");
const { ec } = require('elliptic');
const EC = new ec('secp256k1');
const config = require('../config/default.json');

const generatePrivateKey = () => {
  const keyPair = EC.genKeyPair();
  const privateKey = keyPair.getPrivate();
  return privateKey.toString(16);
}

const getPublicKeyFromPrivateKey = (privateKey) => {
  const key = EC.keyFromPrivate(privateKey, 'hex');
  return key.getPublic().encode('hex');
}

module.exports = {
  generatePrivateKey,
  getPublicKeyFromPrivateKey
}