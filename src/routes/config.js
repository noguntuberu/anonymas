/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const 
path = require('path'),
express = require('express'),
Router = express.Router();

/** ROUTE HANDLERS */
Router.use((req, res, next) => {
    //  Set headers to allow requests from any host
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');

    // Set allowed request methods
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.status(200).json()
    }

    next(); // next middleware in line
});

/** */
const 
// conversations_route_handler = require('./Conversation'),
// messages_route_handler = require('./Messages'),
users_route_handler = require('./Users');


/** */
// Router.use('/conversations', conversations_route_handler);
// Router.use('/messages', messages_route_handler);
Router.use('/users', users_route_handler);


/** */
Router.use('/', (req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});

Router.use((error, req, res, next) => {
    console.log(`Error: ${error.message}`);
    res.status(error.status || 500).json({
        message: error.message ||"Internal Server Error"
    });
}); // Handle any errors
module.exports = Router;