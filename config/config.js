/**
 * @Author: Oguntuberu Nathan O.
 * @Date: 18-12-2018
 */

require('dotenv').config();


const config = {
    setUpMongoDb(mongoose) {
        let database =  process.env.MONGODB_URI || process.env.MONGOLAB_URI ||
                        process.env.MONGOHQ_URL || process.env.DB;
        //
        mongoose.connect(database);
    }
};

module.exports = config;