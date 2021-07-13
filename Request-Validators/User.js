const { body, param, query } = require('express-validator');
const { Util } = require('../Utils');

exports.login = [
    Util.bodyNotEmpty('email').isEmail().withMessage('email is invalid'),
    Util.bodyNotEmpty('password')
];