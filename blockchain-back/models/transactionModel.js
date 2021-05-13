const db = require('../utils/database');

module.exports = {
  getAllTransactionsWithSenderAddress: address => db.loadSafe(`
    SELECT ID as id, Amount as amount, DateAdded as dateAdded, ReceiverAddress as receiver
    FROM Transactions
    WHERE SenderAddress = ?
    ORDER BY DateAdded
  `, address),

  addTransaction: entity => db.add('Transactions', entity),

}