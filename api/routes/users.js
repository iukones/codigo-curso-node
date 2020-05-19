const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const sessionController = require('../controllers/SessionController');

router.route('/')
  .post(
    userController.create,
    sessionController.generateToken,
    sessionController.sendToken
  );

module.exports = router;
