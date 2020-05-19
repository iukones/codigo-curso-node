const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const sessionController = require('../controllers/SessionController');

router.route('/')
  .post(
    userController.create,
    sessionController.generateToken,
    sessionController.sendToken
  )
  // .get(userController.destroyAll); //eliminar usuarios de la BD

module.exports = router;
