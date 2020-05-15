/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

require('dotenv').config();
const SuperController = require('./Super');
const UserModel = require('../models/Users');

class UserControl extends SuperController{
    constructor () {
        super();

        this.model = UserModel;
    }

    //
    async create (data) {        
        const result = await this.model.create_record({ ...data });
        return this.process_read_result(result);
    }

    async read_one (options) {
        const result = await this.model.read_record(options);
        return this.process_read_result(result[0]);
    }

    async read_many (options) {
        const results = await this.model.read_record({...options});
        return this.process_multiple_read_results(results);
    }

    async update_one (options, data) {
        const { _id } = options;
        const result = await this.model.update_record(options, data);
        return this.process_update_result({...result, ...data, _id});
    }

    async update_many (options, data) {
        const result = await this.model.update_record(options, data);
        return this.process_multiple_update_results({...result, ...data});
    }

    async delete_one (options) {
        const result = await this.model.delete_record(options);
        return this.process_delete_result({...result, options});
    }

    async delete_many (options) {
        const result = await this.model.delete_record(options);
        return this.process_multiple_delete_results(result);
    }
}

module.exports = new UserControl;