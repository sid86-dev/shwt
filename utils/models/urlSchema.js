import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    _id: {
        'type': String,
        required: true
    },
    fullUrl: {
        type: String,
        required: true
    },
    
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    created: {
        type: String,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.models.urls || mongoose.model('urls', UrlSchema);