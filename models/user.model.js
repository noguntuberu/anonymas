/**
 * @author: Oguntuberu Nathan O.
 * @date: 31/12/2018
 */

const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

let userSchema = new UserSchema({
  name: { type: String, required: true, max: 50 },
  socket: { type: String, required: false },
  wantsToChat: { type: Boolean, required: true },
  isInChat: { type: Boolean, required: true }
});

const User = module.exports = mongoose.model('User', userSchema);

/**
 * DATABASE METHODS
 */

module.exports.addNewUser = async (newUserInfo) => {
  let result = await newUserInfo.save();
  return result;
}

module.exports.getAllUsers = async () => {
  return await User.find();
}

module.exports.getFreeUser = async (userId) => {
  return await User.findOne(
    {
      $and: [
        { _id: { $ne: userId } },
        { wantsToChat: true },
        { isInChat: false }
      ]
    });
}

module.exports.getInChatStatus = async (userId) => {
  return await User.findOne({ _id: userId }, 'isInChat');
}

module.exports.getSocketId = async (userId) => {
  return await User.findOne({ _id: userId }, 'socket');
}

module.exports.getWantChatStatus = async (userId) => {
  return await User.findOne({ _id: userId }, 'wantsToChat');
}

module.exports.updateInChatStatus = async (data) => {
  return await User.updateOne({ _id: data.id }, { isInChat: data.isInChat });
}

module.exports.updateSocketId = async (data) => {
  return await User.updateOne({ _id: data.id }, { socket: data.socket });
}

module.exports.updateUserInfo = async (data) => {
  return await User.updateOne(
    { _id: data.id },
    {
      name: data.name,
      socket: data.socket,
      wantsToChat: data.wantsToChat,
      isInChat: data.isInChat
    });
}

module.exports.updateWantChatStatus = async (data) => {
  return await User.updateOne({ _id: data.id }, { wantsToChat: data.wantsToChat });
}

/*   REMOVE ALL USERS  */
module.exports.removeAllUsers = async () => {
  return await User.remove();
}