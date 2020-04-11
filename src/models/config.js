/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
**/

require('dotenv').config();
const mongoose = require('mongoose');

class Database {
    constructor(mongoose) {
        const { NODE_ENV, PROD_DB_URI, DEV_DB_URI } = process.env;
        this.database = NODE_ENV == 'production'? PROD_DB_URI: DEV_DB_URI;
        this.mongoose = mongoose;
        this.establishConnection();
    }

    async establishConnection () {
        await this.mongoose.connect(this.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 100
        });

        // this.mongoose.connection.db.dropDatabase();
    }
}

module.exports = new Database(mongoose);