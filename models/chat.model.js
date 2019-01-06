/**
 * @author: Oguntuberu Nathan O.
 * @date: 04/1/2019
 */

const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema;

let chatSchema = new ChatSchema({
   to: {type: String, required: false},
   from: {type: String, required: true},
   isActive: {type: Boolean, required: true}
});

const Chat = module.exports = mongoose.model('Chat', chatSchema);

module.exports.getChat = (userId, callback) => {
    Chat.findOne(
        {
            $or: [
                {to: userId}, 
                {from: userId}
            ]
        },
        callback);
}
module.exports.addChat = (chatData, callback) => {
    chatData.save(callback);
}
module.exports.endChat = (chatId, callback) => {
    Chat.updateOne({_id: chatId}, {isActive: false}, callback);
}