const bcrypt = require('bcryptjs');
const fs = require('fs');
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
  },

  saveBlockchainToFile: blockchain => {
    try {
      fs.writeFileSync('data/chain.json', JSON.stringify(blockchain));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  readBlockchainFromFile: () => {
    try {
      const file = fs.readFileSync('data/chain.json', 'utf8')
      if (file === '') {
        return null;
      }
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}