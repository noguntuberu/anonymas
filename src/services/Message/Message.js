/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

const MessageControl = require('../../controllers/Message');
const ResponseHelper = require('../../utilities/Response');

class MessageService {
    constructor () {
        this.control = MessageControl;
    }

    async create(data) {
        const { sender, conversation_id, body } = data;
        if (!sender || !conversation_id || !body) {
            return ResponseHelper.process_failed_response('Invalid data');
        }

        return await this.control.create({ sender, conversation_id, body});
    }
}

module.exports = new MessageService;