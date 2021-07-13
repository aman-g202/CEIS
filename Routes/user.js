const router = require('express').Router();

const { userValidators } = require('../Request-Validators');
const { UserController } = require('../Controllers');

router.post('/login', userValidators.login, UserController.loginController);

module.exports = router;