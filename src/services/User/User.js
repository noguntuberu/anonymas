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

        const user_retrieval_by_email = this.control.read_one({ email });
        const user_retrieval_by_screen_name = this.control.read_one({ screen_name });

        if ( (await user_retrieval_by_email).success) {
            return ResponseHelper.process_failed_response(`Email already in use`); 
        }
        if ( (await user_retrieval_by_screen_name).success) {
            return ResponseHelper.process_failed_response(`Screen name already in use`); 
        }

        return await this.control.create({ email, screen_name });
    }

    async fetch_users (options = {}) {
        return await this.control.read_many({ ...options});
    }
}

module.exports = new UserService;