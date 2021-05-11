const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/users', require('./users'));
router.use('/wallets', require('./wallets'));
router.use('/transactions', require('./transactions'));

module.exports = router;
