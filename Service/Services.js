'use strict';

class Services {
    success({ statusCode, token = undefined, data = [], totalCounts = null }) {
        return {
            status: 'success',
            statusCode,
            token,
            data,
            totalCounts
        };
    }

    fail({ message = "Something went wrong", statusCode = 500 }) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    paginate(skip = 0, limit) {
        const pagination = {};
        if (limit)
            pagination.limit = parseInt(limit);
        pagination.skip = parseInt(skip);
        return JSON.parse(JSON.stringify(pagination));
    }
}

module.exports = Services