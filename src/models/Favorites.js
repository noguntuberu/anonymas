/**
 * @author Oguntuberu Nathan O. <nateoguns.work@gmail.com>
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ModelHelper = require('./ModelHelper');

const FavoriteSchema = new Schema({
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
        required: true
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

const Favorite = module.exports = mongoose.model('Favorite', FavoriteSchema);

module.exports.create_record = async data => {
    const new_record = new Favorite({ ...data, createdOn: Date.now() });
    return await new_record.save();
};

module.exports.read_record = async options => {
    return await Favorite.find({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    });
}

module.exports.update_record = async (options, data) => {
    return await Favorite.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { ...data });
};

module.exports.delete_record = async options => {
    return await Favorite.updateMany({
        ...ModelHelper.process_alternatives(options),
        isDeleted: false
    }, { 
        isActive: false, 
        isDeleted: true
    });
};