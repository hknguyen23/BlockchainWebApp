const express = require('express');
const router = express.Router();
const walletModel = require('../models/walletModel');

router.put('/update', async (req, res, next) => {
  const { id, money } = req.body;
  const wallet = {
    ID: id,
    TotalCount: money
  }
  const updateWallet = await walletModel.updateWallet(id, { TotalCount: wallet.TotalCount });
  if (updateWallet.affectedRows === 1) {
    return res.json({ success: true, msg: 'updated', wallet });
  } else {
    return res.json({ success: false, msg: 'Something wrong happened when updating wallet' });
  }
});

module.exports = router;
