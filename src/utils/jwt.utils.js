const jsonwebtoken = require("jsonwebtoken");

module.exports.generateToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

module.exports.verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};
