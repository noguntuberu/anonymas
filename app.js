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

const app = express();

/*  MIDDLEWARES */
app.use(express.static('public'));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

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
