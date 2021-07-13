const router = require('express').Router();

const { employeeValidators } = require('../Request-Validators');
const { EmployeeController } = require('../Controllers');

const { Auth } = require('../Utils');

router.post('/register', Auth, employeeValidators.register, EmployeeController.registerEmployee);

router.get('/list', Auth, employeeValidators.list, EmployeeController.listEmployee);

router.get('/:id/find_manager', Auth, EmployeeController.findManagerOfEmployee);

router.patch('/:id/update', Auth, employeeValidators.update, EmployeeController.updateEmployee);

router.delete('/:id/delete', Auth, EmployeeController.deleteEmployee);

module.exports = router;