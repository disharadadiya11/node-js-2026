const bcrypt = require("bcrypt");

module.exports.encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports.decryptPassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
