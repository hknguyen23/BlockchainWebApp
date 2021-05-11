const bcrypt = require('bcryptjs');
const moment = require("moment");
const { v1: uuidv1 } = require('uuid');
const v1options = { msecs: Date.now() };
uuidv1(v1options);
const config = require('../config/default.json');

module.exports = {
  checkPassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },

  hashPassword: password => {
    const salt = bcrypt.genSaltSync(config.HASH_ROUND);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  getUUID: () => {
    return uuidv1();
  },

  convertToRegularDateTime: (date) => {
    return moment(date).format(config.FORMAT_DATETIME_PATTER.DATE_TIME);
  }
}