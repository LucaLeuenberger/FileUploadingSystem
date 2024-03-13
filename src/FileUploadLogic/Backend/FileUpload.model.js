const { Binary, BSON } = require('mongodb');
const mongoose = require('mongoose');

const fileUploadSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    chunkSize: {
        type: Number,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    },
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema, 'uploads.files');

module.exports = FileUpload;