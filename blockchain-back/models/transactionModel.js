const db = require('../utils/database');

module.exports = {

  getAllTransactionsWithUserID: userID => db.load(`
    SELECT T.ID as id, T.*, U.Name As Receiver 
    FROM Transactions T JOIN Users U ON T.ReceiverID = U.ID
    WHERE T.SenderID = ${userID}
    ORDER BY T.DateAdded DESC
  `),

  addTransaction: entity => db.add('Transactions', entity),

}