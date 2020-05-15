/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const UserControl = require('../../controllers/User');
const ResponseHelper = require('../../utilities/Response');

class UserService {
    constructor() {
        this.control = UserControl;
        this.users = {

        };

        this.load_users_to_server_object();
    }

    async load_users_to_server_object() {
        const users_retrieval = await this.control.read_many({});
        users_retrieval.payload.forEach(user => {
            this.add_user_to_server_object(user);
        });
    }

    add_user_to_server_object(data) {
        const { _id } = data;
        this.users[_id] = { ...data };
    }

    get_user_from_server_object(id) {
        return this.users[id];
    }

    async stress_test(data, i = 0) {
        if (i > 4000000) return;
        await this.control.create({ ...data });
        console.log(`Created ${i} records`);
        this.stress_test(data, i++);
    }

    async create_user(request) {
        console.log(`starting stress test`);
        const { email, screen_name } = request.body;

        if (!email) return ResponseHelper.process_failed_response('Specify email');
        if (!screen_name) return ResponseHelper.process_failed_response('Specify screen name');

        const fetch_user_by_email = this.control.read_one({ email });
        const fetch_user_by_screen_name = this.control.read_one({ screen_name });

        const user_data_by_email = await fetch_user_by_email;
        const user_data_by_screen_name = await fetch_user_by_screen_name;

        if (
            user_data_by_email.success &&
            user_data_by_screen_name.success &&
            user_data_by_screen_name.payload._id === user_data_by_email.payload._id
        ) {
            return user_data_by_email;
        }

        if (user_data_by_email.success) return ResponseHelper.process_failed_response('Email already in use.');
        if (user_data_by_screen_name.success) return ResponseHelper.process_failed_response('Screen Name already in use.');

        return await this.control.create({ ...request.body });
    }

    async fetch_users(options = {}) {
        return await this.control.read_many({ ...options });
    }
}

module.exports = new UserService;