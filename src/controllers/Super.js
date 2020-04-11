/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

require('dotenv').config();
const ResponseHelper = require('../utilities/Response');

class SuperControl {
    constructor() {}

    /** */
    check_if_resource_id_is_specified(data) {
        if (data && (data._id === undefined || data._id === null)) {
            throw new Error(`Supply resource ID`);
        }
    }

    jsonize(data) { 
        return JSON.parse(JSON.stringify(data));
    }

    process_read_result(result) {
        if (result && result._id !== undefined) {
            return ResponseHelper.process_success_response({ 
                ...this.jsonize(result)
            });
        }

        return ResponseHelper.process_failed_response(`Could not fetch records`);
    }

    process_multiple_read_results(results) {
        //
        if (results && results.length >= 0) {
            return ResponseHelper.process_success_response(results.map(result => ({
                ...this.jsonize(result)
            })));
        }

        return ResponseHelper.process_failed_response(`Could not fetch records`);
    }

    process_update_result(result) {
        //
        if (result.ok && result.nModified === 1) {
            return ResponseHelper.process_success_response({ ...result })
        } 

        return ResponseHelper.process_failed_response(`Could not update record`)
    }

    process_multiple_update_results(result) {
        //
        if (result.ok && result.nModified >= 1) {
            return ResponseHelper.process_success_response({ ...result });
        }

        return ResponseHelper.process_failed_response(`Could not update records`)
    }

    process_delete_result(result) {
        //
        if (result.nModified !== undefined && result.nModified == 1) {
            return ResponseHelper.process_success_response({})
        }

        return ResponseHelper.process_failed_response(`Could not delete record`)
    }

    process_multiple_delete_results(result) {
        //
        if (result.nModified !== undefined && result.nModified >= 1) {
            return ResponseHelper.process_success_response({})
        }

        return ResponseHelper.process_failed_response(`Could not delete records`)
    }

    determine_pagination(skip = 0, limit = 1) {
        let pagination;
        if (limit === 0) {
            pagination = {
                skip
            }
        } else {
            pagination = {
                skip,
                limit
            }
        }

        return pagination;
    }
}

module.exports = SuperControl;