/**
 * @author: Oguntuberu Nathan O.
 * @date: 31/12/2018
 */

 const mongoose = require('mongoose');
 const schema = mongoose.Schema;

 let userSchema = new schema({
    name : {type: String, required: true, max: 50},
    socket: {type: String, required: false},
    wantsToChat: {type: Boolean, required: true},
    isInChat: {type: Boolean, required: true}
 });

 module.exports = mongoose.model('users', userSchema);