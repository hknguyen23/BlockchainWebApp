const db = require('../utils/database');

module.exports = {

  getWalletByID: id => db.load(`SELECT * FROM Wallets WHERE ID = ${id}`),

  getWalletByUserID: userID => db.load(`
    SELECT W.*
    FROM Wallets W JOIN Users U ON U.WalletID = W.ID
    WHERE U.ID = ${userID}
  `),

  addWallet: entity => db.add('Wallets', entity),

  updateWallet: (id, updatedFields) => db.patch('Wallets', updatedFields, { ID: id }),
}