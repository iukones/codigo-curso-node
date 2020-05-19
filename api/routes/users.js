const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.route('/')
  .post(userController.create)

module.exports = router;
