/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const UserControl = require('../../controllers/User');
const ResponseHelper = require('../../utilities/Response');

class UserService {
    constructor () {
        this.control = UserControl; 
    }

    async create_user (request) {
        const { email, screen_name } = request.body;

        if (!email) {
            return ResponseHelper.process_failed_response('Specify email');
        }

        if (!screen_name) {
            return ResponseHelper.process_failed_response('Specify screen name');
        }
        return await this.control.create({ email, screen_name });
    }

    async fetch_users (options = {}) {
        return await this.control.read_many({ ...options});
    }
}

module.exports = new UserService;