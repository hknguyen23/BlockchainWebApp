const db = require('../utils/database');

module.exports = {

  getWalletByID: id => db.load(`SELECT * FROM Wallets WHERE ID = ${id}`),

  addWallet: entity => db.add('Wallets', entity),

  updateWallet: (id, updatedFields) => db.patch('Wallets', updatedFields, { ID: id }),
}