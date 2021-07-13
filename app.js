const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: `.env` });

const { userRoutes, companyRoutes, employeeRoutes } = require('./Routes');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

/* Routes defined for user module */
app.use('/v1/user', userRoutes);
app.use('/v1/company', companyRoutes);
app.use('/v1/employee', employeeRoutes);

/* Static Content Served */
app.use('/assets', express.static(path.join(__dirname, 'Assets')));

/* Deals with the CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || '';
    let errorData = [];

    if (error.data) {
        errorData = error.data;
    }
    res.status(status).json({
        message: message,
        status: 'failure',
        statusCode: status,
        error: errorData
    });
});

/* Connection with db and hosting the server */ 

mongoose
    .connect('mongodb://localhost:27017/company', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        // await UserModel.create({name: 'Test', email: 'test@gmail.com', password: 'test', mobile: '4564564567', userType: 'ADMIN'})
        console.log('Connected To Database');
        app.listen(process.env.PORT, 'localhost', (res, err) => {
            if (err) {
                onError(err);
            }
            console.log('Company Server Listening on port: ' + process.env.PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });

function onError(error) {
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            debug(process.env.PORT + ' requires elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            debug(process.env.PORT + ' is already in use')
            process.exit(1)
        default:
            throw error
    }
}
