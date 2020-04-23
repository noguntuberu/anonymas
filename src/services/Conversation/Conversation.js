/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const Response = require('../../utilities/Response'); 
const ConversationControl = require('../../controllers/Conversation');
const Queue = require('../../utilities/Queue');

class ConversationService {
    constructor() {
        this.control = ConversationControl;
        this.waiting_users = new Queue();
    }

    async start_conversation(from_user, socket) {
        const to_user = this.waiting_users.shift();
        if (!to_user) {
            this.waiting_users.push(from_user);
            setTimeout(() => {
                this.waiting_users.delete(from_user);
                socket.emit('no_user');
            }, 30000);
            return
        }

        return await this.control.create({ from_user, to_user });
    }

    async end_conversation(id) {
        return await this.control.delete_one({ _id: id });
    }
}

module.exports = new ConversationService;