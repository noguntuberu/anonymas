/**
 *  WEB SOCKETS
**/
const   User = require('../classes/User.js'),
        userModel = require('../models/user.model'),
        chatModel = require('../models/chat.model');


class sockets {
    constructor(io) {
        this.io =  io;
        this.availableUsers = [];
        this.engagedUsers = [];
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('connected to socket.io on: ' + socket.id);
            
            //  LISTEN FOR SCREEN NAME ADDITION
            socket.on('add-screen-name', (data) => {
                let newUser = new User(socket, userModel);
                //
                newUser.setName(data.name);
                newUser.saveName();
            });

            //  LISTEN FOR START CHAT
            socket.on('start-chat', (data) => {
                let user = new User(socket, userModel);
                user.setChatModel(chatModel);
                user.setUSerInfo(data);

                user.startChat((data) => {
                    let retCode = 0;
                    let retBody = {};
                    if(data) {
                        retCode = 1;
                        retBody = user.determineChatDetail();
                        user.resetChatInfo();
                    }

                    socket.emit('start-chat', {code: retCode, body: retBody});
                });
            });

            //  CHAT LISTENERS
            socket.on('join', data => {
                socket.join(data.room);
                console.log('Joined room: ' + data.room);

                this.io.to(data.room).emit('join', 'hello');
            });

            socket.on('typing', room => {
                socket.to(room).emit('typing', {});
            });

            socket.on('new-message', data => {
                socket.to(data.room).emit('new-message', {message: data.message});
            });
        });
    }
}

module.exports = sockets;