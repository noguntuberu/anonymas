/**
 * @author: Oguntuberu Nathan O.
 * @date: 31/12/2018
 */

 const mongoose = require('mongoose');
 const UserSchema = mongoose.Schema;

 let userSchema = new UserSchema({
    name : {type: String, required: true, max: 50},
    socket: {type: String, required: false},
    wantsToChat: {type: Boolean, required: true},
    isInChat: {type: Boolean, required: true}
 });

 const User = module.exports = mongoose.model('User', userSchema);

 /**
  * DATABASE METHODS
  */

 module.exports.addNewUser = (newUserInfo, callback) => {
   newUserInfo.save(callback);
 }

 module.exports.getAllUsers = (callback) => {
   User.find(callback);
 }

 module.exports.getFreeUser = (userId, callback) => {
   User.findOne(
      {
         $and: [
            {_id: {$ne: userId}},
            {wantsToChat: true}, 
            {isInChat: false}
         ]
      }, callback);
 }

 module.exports.getInChatStatus = (userId, callback) => {
   User.findOne({_id: userId}, 'isInChat', callback);
 }

 module.exports.getSocketId = (userId, callback) => {
   User.findOne({_id: userId}, 'socket', callback);
 }
 
 module.exports.getWantChatStatus = (userId, callback) => {
   User.findOne({_id: userId}, 'wantsToChat', callback);
 }

 module.exports.updateInChatStatus = (data, callback) => {
   User.updateOne({_id: data.id}, {isInChat: data.isInChat}, callback);
 }

 module.exports.updateSocketId = (data, callback) => {
   User.updateOne({_id: data.id}, {socket: data.socket}, callback);
 }

 module.exports.updateUserInfo = (data, callback) => {
   User.updateOne(
      {_id: data.id}, 
      {
         name: data.name, 
         socket: data.socket, 
         wantsToChat: data.wantsToChat, 
         isInChat: data.isInChat
      }, 
      callback);
 }

 module.exports.updateWantChatStatus = (data, callback) => {
   User.updateOne({_id: data.id}, {wantsToChat: data.wantsToChat}, callback);
 }

 /*   REMOVE ALL USERS  */
 module.exports.removeAllUsers = (callback) => {
   User.remove(callback);
 }