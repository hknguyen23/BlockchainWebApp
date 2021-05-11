const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');
const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const { getUUID, convertToRegularDateTime } = require('../utils/helper');

router.get('/:userID', async (req, res, next) => {
  const userID = req.params.userID;
  console.log(userID);
  const transactions = await transactionModel.getAllTransactionsWithUserID(userID);
  res.json({ success: true, msg: 'fetched', transactions });
});

router.post('/add', async (req, res, next) => {
  const { senderID, receiverID, amount, description } = req.body;

  const [sender, receiver] = await Promise.all([
    userModel.getUserByID(senderID),
    userModel.getUserByID(receiverID)
  ]);

  if (sender.length === 0) {
    return res.json({ success: false, msg: 'No sender with ID: ' + senderID });
  }
  if (receiver.length === 0) {
    return res.json({ success: false, msg: 'No receiver with ID: ' + receiverID });
  }

  const [senderWallet, receiverWallet] = await Promise.all([
    walletModel.getWalletByUserID(senderID),
    walletModel.getWalletByUserID(receiverID)
  ]);

  const [updateSenderWallet, updateReceiverWallet] = await Promise.all([
    walletModel.updateWallet(senderWallet[0].ID, { TotalCount: senderWallet[0].TotalCount - amount }),
    walletModel.updateWallet(receiverWallet[0].ID, { TotalCount: receiverWallet[0].TotalCount + amount })
  ]);

  const entity = {
    ID: getUUID(),
    Amount: amount,
    Description: description,
    DateAdded: convertToRegularDateTime(Date.now()),
    SenderID: senderID,
    ReceiverID: receiverID
  }

  const addTransaction = await transactionModel.addTransaction(entity);
  if (addTransaction.affectedRows === 1) {
    return res.json({ success: true, msg: 'added' });
  } else {
    return res.json({ success: false, msg: 'Something wrong happened when creating transaction' });
  }
});

module.exports = router;
