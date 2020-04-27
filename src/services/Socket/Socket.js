/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const ConversationService = require('../Conversation/Conversation');

class Socket {
    constructor() {
        this.socket = null;
    }
    initialize(main_socket) {
        this.socket = main_socket;

        this.socket.on('connection', async socket => {
            /** */
            socket.on('join_room', room_id => {
                this.socket.join(room_id);
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
                this.socket.to(room_id).broadcast.emit('typing', is_typing);
            });

            socket.on('message', data => {
                const { room_id, sender, new_message } = data;
                this.socket.to(room_id).broadcast.emit('message', { sender, new_message });
            });

            socket.on('left', data => {
                const { room_id } = data;
                this.socket.to(room_id).broadcast.emit('left');
                socket.leave(room_id);
            });
        });
    }
}

module.exports = new Socket;