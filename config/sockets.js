/**
 *  WEB SOCKETS
**/
const   User = require('../classes/User.js'),
        userModel = require('../models/user.model');


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
                let newUser = new User(userModel);

                console.log('Socket ID: '+ data.socketId);

                newUser.setName(data.name);
                if(newUser.saveName()) {
                    socket.emit('')
                } else {
                    console.log('Unable to add screen name: ' + data.name);
                }
            });

            //  LISTEN FOR START CHAT
            socket.on('start-chat', (data) => {

            });
        });
    }
}

module.exports = sockets;