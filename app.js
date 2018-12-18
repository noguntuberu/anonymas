/**
 * MAIN APP FILE
 * @Author: Oguntuberu Nathan O.
 * @Data: 18-12-2018
 */

/*  REQUIRED MODULES    */
const express = require('express');
const config = require('./config/config');
const http = require('http');

const app = express();

/*  MIDDLEWARES */
app.use(express.static('public'));

/*  ROUTING */
app.use('/start');
app.use('/chat');

app.use('/*', (req, res) => {
    res.redirect('/');
});

/* WEB SOCKETS*/
const sockets = require('./config/sockets')(http, app);
sockets.config();
sockets.listen();
