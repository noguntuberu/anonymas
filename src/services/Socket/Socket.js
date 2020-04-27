/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const ConversationService = require('../Conversation/Conversation');

class Socket {
    constructor() {
        this.socket = null;
    }
    initialize(socket) {
        this.socket = socket;

        this.socket.on('connection', async socket => {
            /** */
            socket.on('join_room', room_id => {
                socket.join(room_id);
            })

            socket.on('start_chat', async data => {
                const { user } = data;
                const user_id = user._id;

                socket.broadcast.emit('available', { user_id } );
                const conversation = await ConversationService.start_conversation(user, socket);

                if (!conversation || !conversation.success) return;

                this.socket.emit('chat_started', conversation.payload);
            });

            socket.on(`typing`, data => {
                const { room_id, is_typing } = data;
                socket.to(room_id).broadcast.emit('typing', is_typing);
            });

            socket.on('message', data => {
                const { room_id, user_id, new_message } = data;
                socket.to(room_id).broadcast.emit('message', { user_id, new_message });
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