const mongoose = require('mongoose');
const { Logger } = require('../Utils');
const Services = require('./Services');

const { EmployeeModel } = require('../Models');

class EmployeeService extends Services {

    async createEmployee(params) {
        try {
            params.empId = `EID${new Date().getTime()}`;
            await EmployeeModel.create(params);
            return this.success({ statusCode: 201 });
        } catch (error) {
            Logger.error('Employee create service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async listEmployee(params) {
        try {
            const paginate = this.paginate(params.skip, params.limit);
            let query = {
                filter: {
                    companyId: params.companyId ? params.companyId : undefined,
                    $or: params.search ? [
                        {
                            name: { $regex: `.*${params.search}.*`, $options: 'i' }
                        },
                        {
                            mobile: { $regex: `.*${params.search}.*`, $options: 'i' }
                        },
                        {
                            empId: { $regex: `.*${params.search}.*`, $options: 'i' }
                        }
                    ] : undefined
                }
            };
            query = JSON.parse(JSON.stringify(query));
            const employees = await EmployeeModel.find(query.filter, null, { ...paginate });
            return this.success({ statusCode: 200, data: employees });
        } catch (error) {
            Logger.error('Employee list service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async findManagerOfEmployee(id) {
        try {
            id = mongoose.Types.ObjectId(id);
            let query = {
                filter: {
                    _id: id
                }
            };
            const employee = await EmployeeModel.findOne(query.filter).populate('managerId').populate('companyId');
            return this.success({ statusCode: 200, data: employee });
        } catch (error) {
            Logger.error('Employee find manager service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async updateEmployee(params) {
        try {
            const id = mongoose.Types.ObjectId(params.id);
            delete params.id;
            const emp = await EmployeeModel.findOne({ _id: id });
            if (!emp) {
                throw this.fail({ message: 'Employee does not exists', statusCode: 404 });
            }
            await EmployeeModel.updateOne({ _id: id }, params);
            return this.success({ statusCode: 202 });
        } catch (error) {
            Logger.error('Employee update service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async deleteEmployee(id) {
        try {
            id = mongoose.Types.ObjectId(id);
            const emp = await EmployeeModel.findOneAndDelete({ _id: id });
            if (!emp) {
                throw this.fail({ message: 'Employee does not exists', statusCode: 404 });
            }
            return this.success({ statusCode: 202 });
        } catch (error) {
            Logger.error('Employee delete service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = new EmployeeService();