/**
 * MAIN APP FILE
 * @Author: Oguntuberu Nathan O.
 * @Data: 18-12-2018
 */

/*  REQUIRE MODULES    */
const   mongoose = require('mongoose'),
        compression = require('compression'),
        helmet = require('helmet'),
        express = require('express'),
        config = require('./config/config'),
        bodyParse = require('body-parser'),
        cors = require('cors');

const   user = require('./routes/user.route');
const   chat = require('./routes/chat.route');

var http = require('http');

//  CONFIGURE DATABASE
config.setUpMongoDb(mongoose);

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

/** BASIC */
app.use('/start', (req, res) => {
    res.sendFile(__dirname + '/public/start.html');
});
app.use('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

/** MIDDLE */
app.use('/user', user);
app.use('/convo', chat);
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