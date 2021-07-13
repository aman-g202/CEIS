const { body, param, query } = require('express-validator');
const { Util } = require('../Utils');
const { country } = require('../Config')

exports.register = [
    body('managerId').optional().isMongoId().withMessage('Invalid managerId'),
    Util.bodyNotEmpty('companyId').isMongoId().withMessage('Invalid companyId'),
    Util.bodyNotEmpty('name').matches(/^[A-Za-z ]+$/).withMessage('name must be string only'),
    Util.bodyNotEmpty('email').isEmail().withMessage('Email is invalid'),
    Util.bodyNotEmpty('mobile').isMobilePhone(country).withMessage('mobile is invalid'),
    Util.bodyNotEmpty('address'),
    body('hireDate').optional().isDate().withMessage('hireDate is invalid'),
    Util.bodyNotEmpty('salary').isFloat().withMessage('salary must be number only'),
    Util.bodyNotEmpty('deptName').matches(/^[A-Za-z ]+$/).withMessage('deptName must be string only'),
];

exports.list = [
    query('skip').optional().isInt().withMessage('skip must be integer only'),
    query('limit').optional().isInt().withMessage('limit must be integer only'),
    query('companyId').optional().isMongoId().withMessage('Invalid companyId'),
];

exports.update = [
    body('managerId').optional().isMongoId().withMessage('Invalid managerId'),
    body('companyId').optional().isMongoId().withMessage('Invalid companyId'),
    body('name').optional().matches(/^[A-Za-z ]+$/).withMessage('name must be string only'),
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('mobile').optional().isMobilePhone(country).withMessage('mobile is invalid'),
    body('hireDate').optional().isDate().withMessage('hireDate is invalid'),
    body('salary').optional().isFloat().withMessage('salary must be number only'),
    body('deptName').optional().matches(/^[A-Za-z ]+$/).withMessage('deptName must be string only'),
];