/**
 * MAIN APP FILE
 * @Author: Oguntuberu Nathan O.
 * @Data: 18-12-2018
 */

/*  REQUIRE MODULES    */
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const config = require('./config/config');
const http = require('http');
const bodyParse = require('body-parser');
const cors = require('cors');

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
const startPath = require('./routes/start');
const chatPath = require('./routes/chat');

app.use('/start', startPath);
app.use('/chat', chatPath);

app.get('/', (req, res) => {
    res.send('Hello!');
});

/* WEB SOCKETS*/
var sockets = require('./config/sockets');
sockets = new sockets(http, app);

sockets.config();
sockets.listen();


//  SERVE APPLICATION
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log('Node is listening on port: ' + port);
});