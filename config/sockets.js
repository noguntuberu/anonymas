/**
 *  WEB SOCKETS
**/

class sockets {
    constructor(http, app) {
        this.io = require('socket.io');
        this.http = http;
        this.app = app;
    }
    config() {
        this.http = this.http.Server(this.app);
        this.io = this.io(this.http);
    }
    listen() {
        this.io.on('connection', (socket) => {
            console.log('connected to socket.io on: ' + socket.id);
        });
    }
}

modules.exports = sockets;