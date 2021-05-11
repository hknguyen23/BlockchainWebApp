const express = require('express');
const router = express.Router();

const userModel = require('../models/userModel');
const walletModel = require('../models/walletModel');
const { checkPassword, hashPassword, getUUID } = require('../utils/helper');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signIn', async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);

  console.log(user);

  if (user.length === 0) {
    return res.json({ success: false, msg: 'No user found!!!' });
  }

  const check = checkPassword(password, user[0].Password);
  if (check) {
    return res.json({ success: true, msg: 'ok', user: user[0] });
  } else {
    return res.json({ success: false, msg: 'Password is incorrect!!!' });
  }
});

router.post('/signUp', async (req, res, next) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;

  // Check the same username
  const user = await userModel.getUserByUsername(username);
  if (user.length !== 0) {
    return res.json({ success: false, msg: 'This username is already exist!!!' });
  }

  // create a wallet for user
  const wallet = {
    ID: getUUID(),
    TotalCount: 100
  }
  const addWallet = await walletModel.addWallet(wallet);
  if (addWallet.affectedRows !== 1) {
    return res.json({ success: false, msg: 'Something wrong happened when creating wallet for user' });
  }

  const hash = hashPassword(password);
  const newUser = {
    ID: getUUID(),
    Name: name,
    Username: username,
    Password: hash,
    Email: email,
    WalletID: wallet.ID
  }

  const addUser = await userModel.addUser(newUser);
  if (addUser.affectedRows === 1) {
    return res.json({ success: true, msg: 'added', user: newUser });
  } else {
    return res.json({ success: false, msg: 'Something wrong happened when creating user' });
  }
});

module.exports = router;
