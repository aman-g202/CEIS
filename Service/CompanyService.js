const mongoose = require('mongoose');
const { Logger } = require('../Utils');
const Services = require('./Services');

const { CompanyModel } = require('../Models');

class CompanyService extends Services {

    async createCompany(params) {
        try {
            const company = await CompanyModel.findOne({ companyCode: params.companyCode });
            if (company) {
                throw this.fail({ message: 'Company Code already exists', statusCode: 406 });
            }
            await CompanyModel.create(params);
            return this.success({ statusCode: 201 });
        } catch (error) {
            Logger.error('Company create service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async listCompany(params) {
        try {
            const paginate = this.paginate(params.skip, params.limit);
            const company = await CompanyModel.find({}, null, { ...paginate });
            return this.success({ statusCode: 200, data: company });
        } catch (error) {
            Logger.error('Company list service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async updateCompany(params) {
        try {
            const id = mongoose.Types.ObjectId(params.id);
            delete params.id;
            const company = await CompanyModel.findOne({ _id: id });
            if (!company) {
                throw this.fail({ message: 'Company does not exists', statusCode: 404 });
            }
            await CompanyModel.updateOne({ _id: id }, params);
            return this.success({ statusCode: 202 });
        } catch (error) {
            Logger.error('Company update service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }

    async deleteCompany(id) {
        try {
            id = mongoose.Types.ObjectId(id);
            const company = await CompanyModel.findOneAndDelete({ _id: id });
            if (!company) {
                throw this.fail({ message: 'Company does not exists', statusCode: 404 });
            }
            return this.success({ statusCode: 202 });
        } catch (error) {
            Logger.error('Company delete service failed with error -> %s', JSON.stringify(error));
            throw error;
        }
    }
}

module.exports = new CompanyService();