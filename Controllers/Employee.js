const { Util } = require('../Utils');
const { EmployeeService } = require('../Service');

const registerEmployee = async (req, res, next) => {
    try {
        /* Added Admin check at controller level because other user might exist and can login to perform other tasks */
        if (req.userType !== 'ADMIN') {
            throw EmployeeService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const body = req.body;
        const response = await EmployeeService.createEmployee(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const listEmployee = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw EmployeeService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const query = req.query;
        const response = await EmployeeService.listEmployee(query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const findManagerOfEmployee = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw EmployeeService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const id = req.params.id;
        const response = await EmployeeService.findManagerOfEmployee(id);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw EmployeeService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const body = req.body;
        body.id = req.params.id;
        const response = await EmployeeService.updateEmployee(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw EmployeeService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const id = req.params.id;
        const response = await EmployeeService.deleteEmployee(id);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerEmployee,
    listEmployee,
    findManagerOfEmployee,
    updateEmployee,
    deleteEmployee,
}