import mongoose from 'mongoose';
import buildId from 'build-id';

const UrlSchema = new mongoose.Schema({
    _id: {
        'type': String,
        default: buildId(10),
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        default: 0
    },
    accessId: {
        type: String,
        required: true,
        default: buildId(50)
    },
    refreshId: {
        type: String,
        required: true,
        default: buildId(70)
    },
    created: {
        type: String,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.models.users || mongoose.model('users', UrlSchema);