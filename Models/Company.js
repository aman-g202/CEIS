const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyCode: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    founderName: {
        type: String,
        required: true
    },
    foundedYear: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    employeeStrength: {
        type: Number,
        required: true
    },
    companyDomain: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', companySchema);
