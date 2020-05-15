/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

/**    IMPORTANT MODULE (*/
require('dotenv').config();
require('./src/models/config');

//
const
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    express = require('express'),
    express_file_upload = require('express-fileupload'),
    fs = require('fs'),
    helmet = require('helmet'),
    https = require('https');
    // http = require('http');


/** INSTANTIATE APP*/
const app = express();

/** APPLY MIDDLEWARES */
app.use(express.static('public'));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_file_upload());

/** ROUTES */
const routeHandler = require('./src/routes/config');
app.use('/', routeHandler);


/** START SERVER*/
const ssl_config = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
}
const server = https.createServer(ssl_config, app);
// const server = http.createServer(app);

/** SOCKET */
const SocketService = require('./src/services/Socket/Socket');
const socket = require('socket.io')(server, {
    // transports: ['websocket']
});
SocketService.initialize(socket);

const port = process.env.APP_PORT || 3030;
server.listen(port, () => {
    console.log(`Server Running on port: ${port}`);
});