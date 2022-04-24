import mongoose from 'mongoose';
import shortId from 'shortid';

const shortUrlSchema = new mongoose.Schema({
    _id: {
        'type': String,
        'default': shortId.generate
    },
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('links', shortUrlSchema, 'links')