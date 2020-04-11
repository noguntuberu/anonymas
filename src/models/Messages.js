/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelHelper = require('./ModelsHelper');

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: false
    },
    conversation_id : {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.create_record = async data => {
    const new_record = new Message({ ...data });
    return await new_record.save();
};

module.exports.read_record = async options => {
    return await Message.find({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    });
}

module.exports.update_record = async (options, data) => {
    return await Message.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { ...data });
};

module.exports.delete_record = async options => {
    return await Message.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { 
        isActive: false, 
        isDeleted: true
    });
};