const router = require('express').Router();

const { companyValidators } = require('../Request-Validators');
const { CompanyController } = require('../Controllers');

const { Auth } = require('../Utils');

router.post('/register', Auth, companyValidators.register, CompanyController.registerCompany);

router.get('/list', Auth, companyValidators.list, CompanyController.listCompany);

router.patch('/:id/update', Auth, companyValidators.update, CompanyController.updateCompany);

router.delete('/:id/delete', Auth, CompanyController.deleteCompany);

module.exports = router;