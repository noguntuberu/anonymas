/**
 *  WEB SOCKETS
**/

class sockets {
    constructor(io) {
        this.io =  io;
        this.availableUsers = '{}';
        this.engagedUsers = '{}';
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('connected to socket.io on: ' + socket.id);
        });
    }
}

module.exports = sockets;