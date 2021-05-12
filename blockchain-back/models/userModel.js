const db = require('../utils/database');

module.exports = {

  getUserByID: id => db.load(`SELECT * FROM Users WHERE ID = '${id}'`),

  getUserByAddress: address => db.loadSafe(`SELECT * FROM Users WHERE WalletAddress = ?`, address),

  getUserByUsername: username => db.load(`SELECT * FROM Users WHERE Username = '${username}'`),

  addUser: entity => db.add('Users', entity),

  updateUser: (id, updatedFields) => db.patch('Users', updatedFields, { ID: id }),
}