const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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