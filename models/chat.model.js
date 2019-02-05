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

module.exports.getAllChats = async () => {
    return await Chat.find();
}
module.exports.getChat = async (userId) => {
    return await Chat.findOne(
        {
            isActive: true,
            $or: [
                {to: userId}, 
                {from: userId}
            ]
        });
}
module.exports.addChat = async (chatData) => {
    return await chatData.save();
}
module.exports.endChat = async (chatId) => {
    return await Chat.updateOne({_id: chatId}, {isActive: false});
}
module.exports.removeAllChats = async () => {
    return await Chat.remove();
}