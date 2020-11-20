const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/SessionController');

router.route('/')
  .post(
    sessionController.authenticate,
    sessionController.generateToken,
    sessionController.sendToken
  );

module.exports = router;