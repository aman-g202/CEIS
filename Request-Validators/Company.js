const { body, param, query } = require('express-validator');
const { Util } = require('../Utils');

exports.register = [
    Util.bodyNotEmpty('companyCode').isAlphanumeric().withMessage('companyCode must be alpha neumeric only'),
    Util.bodyNotEmpty('companyName').matches(/^[A-Za-z ]+$/).withMessage('companyName must be string only'),
    Util.bodyNotEmpty('address'),
    Util.bodyNotEmpty('founderName').matches(/^[A-Za-z ]+$/).withMessage('founderName must be string only'),
    Util.bodyNotEmpty('foundedYear').isInt().withMessage('foundedYear must be number only'),
    Util.bodyNotEmpty('employeeStrength').isInt().withMessage('employeeStrength must be number only'),
    Util.bodyNotEmpty('companyDomain').matches(/^[A-Za-z ]+$/).withMessage('companyDomain must be string only'),
];

exports.list = [
    query('skip').optional().isInt().withMessage('skip must be integer only'),
    query('limit').optional().isInt().withMessage('limit must be integer only'),
];

exports.update = [
    body('companyCode').optional().isAlphanumeric().withMessage('companyCode must be alpha neumeric only'),
    body('companyName').optional().matches(/^[A-Za-z ]+$/).withMessage('companyName must be string only'),
    body('founderName').optional().matches(/^[A-Za-z ]+$/).withMessage('founderName must be string only'),
    body('foundedYear').optional().isInt().withMessage('foundedYear must be number only'),
    body('employeeStrength').optional().isInt().withMessage('employeeStrength must be number only'),
    body('companyDomain').optional().matches(/^[A-Za-z ]+$/).withMessage('companyDomain must be string only'),
];