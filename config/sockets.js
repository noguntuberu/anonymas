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
                
                if(user.startChat(data)) {
                    console.log('success');
                } else {
                    console.log('failure');
                }
            });
        });
    }
}

module.exports = sockets;