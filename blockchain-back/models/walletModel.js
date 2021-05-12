const db = require('../utils/database');

module.exports = {

  getWalletByAddress: address => db.loadSafe(`SELECT Balance, PublicKey FROM Wallets WHERE PublicKey = ?`, address),

  addWallet: entity => db.add('Wallets', entity),

  updateWallet: (publicKey, updatedFields) => db.patch('Wallets', updatedFields, { PublicKey: publicKey }),
}