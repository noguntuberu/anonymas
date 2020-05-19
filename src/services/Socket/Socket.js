/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/
const ConversationService = require('../Conversation/Conversation');
const FavoriteService = require('../User/Favorites');
const MessageService = require('../Message/Message');
const UserService = require('../User/User');

class Socket {
    initialize(io) {
        io.on('connection', async socket => {

            socket.once('user:online', data => {
                io.emit('user:online', data);
            });

            socket.on('room:join', room_id => {
                socket.join(room_id);
            });

            socket.on('chat:join', async data => {
                const { user } = data;
                socket.broadcast.emit('user:available', { user_id: user._id });
                const conversation = await ConversationService.start_conversation(user, socket);

                if (!conversation || !conversation.success) return;
                io.emit('chat:started', conversation.payload);
            });

            socket.on('chat:leave', data => {
                const { room_id } = data;
                socket.to(room_id).broadcast.emit('chat:left');
                socket.leave(room_id);
            });

            socket.on(`chat:typing`, data => {
                const { room_id, is_typing } = data;
                socket.to(room_id).broadcast.emit('chat:typing', is_typing);
            });

            socket.on('favorite:add', async data => {
                const fave_addition = await FavoriteService.add_favorite(data);
                const user = UserService.get_user_from_server_object(data.to_user)
                socket.emit('favorite:added', { ...fave_addition, user });
            });

            socket.on('favorite:remove', async data => {
                const fave_removal = await FavoriteService.remove_favorite(data);
                socket.emit('favorite:removed', { ...fave_removal, user: data.to_user});
            });

            socket.on('message:add', async data => {
                MessageService.create({ ...data}, socket);
            });

            
        });
    }
}

module.exports = new Socket;