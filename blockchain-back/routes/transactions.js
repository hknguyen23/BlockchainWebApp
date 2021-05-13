const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');
const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const { getUUID, convertToRegularDateTime, saveBlockchainToFile } = require('../utils/helper');
const { generateBlock, getBlockchain, isValidChain } = require('../models/block');

router.get('/:address', async (req, res, next) => {
  const address = req.params.address;
  const transactions = await transactionModel.getAllTransactionsWithSenderAddress(address);
  res.json({ success: true, msg: 'fetched', transactions });
});

router.post('/add', async (req, res, next) => {
  const { senderAddress, receiverAddress, amount } = req.body;

  if (senderAddress === receiverAddress) {
    return res.json({ success: false, msg: 'Sender address is the same as the receiver address' });
  }

  const [sender, receiver] = await Promise.all([
    userModel.getUserByAddress(senderAddress),
    userModel.getUserByAddress(receiverAddress)
  ]);

  if (sender.length === 0) {
    return res.json({ success: false, msg: 'No sender with address: ' + senderAddress });
  }
  if (receiver.length === 0) {
    return res.json({ success: false, msg: 'No receiver with address: ' + receiverAddress });
  }

  const [senderWallet, receiverWallet] = await Promise.all([
    walletModel.getWalletByAddress(senderAddress),
    walletModel.getWalletByAddress(receiverAddress)
  ]);

  if (senderWallet[0].Balance < amount) {
    return res.json({
      success: false,
      msg: 'You don\'t have enough money to do this transaction. Your current balance: ' + senderWallet[0].Balance
    });
  }

  const [updateSenderWallet, updateReceiverWallet] = await Promise.all([
    walletModel.updateWallet(senderAddress, { Balance: senderWallet[0].Balance - amount }),
    walletModel.updateWallet(receiverAddress, { Balance: receiverWallet[0].Balance + amount })
  ]);

  const entity = {
    ID: getUUID(),
    Amount: amount,
    DateAdded: convertToRegularDateTime(Date.now()),
    SenderAddress: senderAddress,
    ReceiverAddress: receiverAddress
  }

  const addTransaction = await transactionModel.addTransaction(entity);
  if (addTransaction.affectedRows === 1) {
    const newBlock = generateBlock(entity);
    const blockchain = getBlockchain();
    blockchain.push(newBlock);
    if (isValidChain(blockchain)) {
      saveBlockchainToFile(blockchain);
      return res.json({ success: true, msg: 'added' });
    } else {
      return res.json({ success: false, msg: 'Invalid blockchain' });
    }
  } else {
    return res.json({ success: false, msg: 'Something wrong happened when creating transaction' });
  }
});

module.exports = router;
