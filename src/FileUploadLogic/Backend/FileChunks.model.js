const mongoose = require('mongoose');

const fileChunkSchema = mongoose.Schema({
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    files_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },  
    n: {
        type: Number,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
});

const FileChunk = mongoose.model('FileChunk', fileChunkSchema, 'uploads.chunks');

module.exports = FileChunk;