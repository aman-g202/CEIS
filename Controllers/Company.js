const { Util } = require('../Utils');
const { CompanyService } = require('../Service');

const registerCompany = async (req, res, next) => {
    try {
        /* Added Admin check at controller level because other user might exist and can login to perform other tasks */
        if (req.userType !== 'ADMIN') {
            throw CompanyService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const body = req.body;
        const response = await CompanyService.createCompany(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const listCompany = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw CompanyService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const query = req.query;
        const response = await CompanyService.listCompany(query);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const updateCompany = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw CompanyService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const body = req.body;
        body.id = req.params.id;
        const response = await CompanyService.updateCompany(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

const deleteCompany = async (req, res, next) => {
    try {
        if (req.userType !== 'ADMIN') {
            throw CompanyService.fail({ message: 'Not Authorized', statusCode: 401 });
        }
        Util.checkInputError(req);
        const id = req.params.id;
        const response = await CompanyService.deleteCompany(id);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerCompany,
    listCompany,
    updateCompany,
    deleteCompany
}