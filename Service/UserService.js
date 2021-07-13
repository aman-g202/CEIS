const jwt = require('jsonwebtoken');
const { jwtOption } = require('../Config');

const { Logger } = require('../Utils');
const Services = require('./Services');

const { UserModel } = require('../Models');

class UserService extends Services {

    async loginService(params) {
        try {
            Logger.info('Login Service Started for User having email - %s', params.email);
            const user = await UserModel.findOne({ email: params.email });
            if (!user) {
                throw this.fail({ message: 'User doesn\'t exists', statusCode: 404 });
            }
            if (params.password !== user.password) {
                throw this.fail({ message: 'Password is incorrect', statusCode: 401 });
            }

            const jwtToken = jwt.sign(
                {
                    userId: user._id,
                    mobile: user.mobile,
                    userType: user.userType
                },
                jwtOption.secret,
                {
                    expiresIn: jwtOption.expiresIn,
                    algorithm: 'HS512'
                }
            );
            Logger.info('Login Service Ended for User having email - %s', params.email);
            return this.success({ statusCode: 200, token: jwtToken, data: user });
        } catch (error) {
            Logger.error('Login Service Failed for User having email - %s with error -> %s', params.email, JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = new UserService();