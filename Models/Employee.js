const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    managerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    name: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        required: true
    },
    deptName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Employee', employeeSchema);
