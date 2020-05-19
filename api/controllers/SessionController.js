
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');


function generateToken(req, res, next) {
  if (!req.user) return next();

  req.token = jwt.sign({id: req.user._id}, secret.jwtSecret);

  next();
}

function sendToken(req, res) {
  if (req.user) {
    res.json({
      user: req.user,
      jwt: req.token
    })
  } else {
    res.status(422).json({
      error: 'Could not create user'
    })
  }
}



module.exports = {
  generateToken,
  sendToken
}