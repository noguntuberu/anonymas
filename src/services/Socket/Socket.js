/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const ConversationService = require('../Conversation/Conversation');
const MessageService = require('../Message/Message');

class Socket {
    initialize(io) {
        io.on('connection', async socket => {
            /** */
            socket.on('join_room', room_id => {
                socket.join(room_id);
            });

            socket.on('start_chat', async data => {
                const { user } = data;
                const user_id = user._id;

                socket.broadcast.emit('available', { user_id });
                const conversation = await ConversationService.start_conversation(user, socket);

                if (!conversation || !conversation.success) return;

                io.emit('chat_started', conversation.payload);
            });

            socket.on(`typing`, data => {
                const { room_id, is_typing } = data;
                socket.to(room_id).broadcast.emit('typing', is_typing);
            });

            socket.on('message', async data => {
                const { conversation_id, sender, body } = data;
                const creation_data = {
                    sender,
                    conversation_id,
                    body
                };

                const message_creation = await MessageService.create(creation_data);

                let message_response = {};
                if (message_creation.success) {
                    message_response = { ...data, ...message_creation.payload, status: 'sent' };
                } else {
                    message_response = { ...data, status: 'failed' }
                }
                socket.to(conversation_id).broadcast.emit('message', { ...message_response });
            });

            socket.on('left', data => {
                const { room_id } = data;
                socket.to(room_id).broadcast.emit('left');
                socket.leave(room_id);
            });
        });
    }
}

module.exports = new Socket;