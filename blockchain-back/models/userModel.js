const db = require('../utils/database');

module.exports = {

  getUserByID: id => db.load(`SELECT * FROM Users WHERE ID = '${id}'`),

  getUserByUsername: username => db.load(`SELECT * FROM Users WHERE Username = '${username}'`),

  addUser: entity => db.add('Users', entity),

  updateUser: (id, updatedFields) => db.patch('Users', updatedFields, { ID: id }),
}