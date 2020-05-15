/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

const MessageControl = require('../../controllers/Message');

class MessageService {
    constructor() {
        this.control = MessageControl;
    }

    async create(data, socket) {
        const { sender, conversation_id, body } = data;
        let response = { ...data, status: 'failed' };

        if (!sender || !conversation_id || !body) socket.emit('message:status', response);

        const message_creation = await this.control.create({ sender, conversation_id, body });
        if (!message_creation.success) return socket.emit('message:status', response);
        
        socket.emit('message:status', { ...data, ...message_creation.payload, status: 'sent' });
        socket.to(conversation_id).broadcast.emit('message:added', { flag: data.flag, ...message_creation.payload });
    }
}

module.exports = new MessageService;