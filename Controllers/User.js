const { Util } = require('../Utils');
const { UserService } = require('../Service');

const loginController = async (req, res, next) => {
    try {
        Util.checkInputError(req);
        const body = req.body;
        const response = await UserService.loginService(body);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginController
}