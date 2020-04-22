/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelHelper = require('./ModelHelper');

const ConversationSchema = new Schema({
    from_user: {
        type: String,
        required: false
    },
    to_user : {
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

const Conversation = module.exports = mongoose.model('Conversation', ConversationSchema);

module.exports.create_record = async data => {
    const new_record = new Conversation({ ...data });
    return await new_record.save();
};

module.exports.read_record = async options => {
    return await Conversation.find({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    });
}

module.exports.update_record = async (options, data) => {
    return await Conversation.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { ...data });
};

module.exports.delete_record = async options => {
    return await Conversation.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { 
        isActive: false, 
        isDeleted: true
    });
};