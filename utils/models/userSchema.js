import mongoose from 'mongoose';
import buildId from 'build-id';

const UrlSchema = new mongoose.Schema({
    _id: {
        'type': String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },
    accessId: {
        type: String,
        default: null
    },
    refreshId: {
        type: String,
        default: null
    },
    created: {
        type: String,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.models.users || mongoose.model('users', UrlSchema);