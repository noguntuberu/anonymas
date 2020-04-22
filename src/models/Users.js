/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelHelper = require('./ModelHelper');

const UserSchema = new Schema({
    email: {
        type: String,
        required: false
    },
    screen_name : {
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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create_record = async data => {
    const new_record = new User({ ...data });
    return await new_record.save();
};

module.exports.read_record = async options => {
    return await User.find({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    });
}

module.exports.update_record = async (options, data) => {
    return await User.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { ...data });
};

module.exports.delete_record = async options => {
    return await User.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { 
        isActive: false, 
        isDeleted: true
    });
};