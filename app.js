/**
 * MAIN APP FILE
 * @Author: Oguntuberu Nathan O.
 * @Data: 18-12-2018
 */

/*  REQUIRE MODULES    */
const   compression = require('compression'),
        helmet = require('helmet'),
        express = require('express'),
        config = require('./config/config'),
        bodyParse = require('body-parser'),
        cors = require('cors');

var http = require('http');



//  INSTANTIATE APP
const app = express();

//  MIDDLEWARE
app.use(express.static('public'));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

//  ROUTING

app.use('/start', (req, res) => {
    res.sendFile(__dirname + '/public/start.html');
});
app.use('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});
app.use('/*', (req, res) => {

});

/* WEB SOCKETS*/
var io = require('socket.io');
var wSocket = require('./config/sockets');
http = http.Server(app);

io = io(http);
wSocket = new wSocket(io);
wSocket.listen();

//  SERVE APPLICATION
const port = 3000;
http.listen(process.env.PORT || port, () => {
    console.log('Node is listening on port: ' + port);
});