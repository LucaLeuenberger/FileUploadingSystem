const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const FileUpload = require('./FileUpload.model');
const cors = require('cors');
const e = require('express');

// Create a new Express application
const app = express();
app.use(express.json(), cors(), bodyParser.json());

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/FileUploadingSystem', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
gfs = new mongoose.mongo.GridFSBucket(db, {bucketName: 'fileuploads'});

// Create a storage engine for Multer using GridFS
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/FileUploadingSystem',
  options: { useUnifiedTopology: true , useNewUrlParser: true},
  file: (req, file) => {
    if (!file) {
      throw new Error('No file provided');
    }
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})

// --- Multiple file upload (not implemented) ---
app.post('/multipleuploads', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({sttus:  'ok'});
})

// Get all files in the collection and return them as JSON objects
app.get('/files', async (req, res) => {
  try {
    files = await FileUpload.find({});
    res.send(files);
  }
  catch (error) {
    res.status(500).send('Error getting files');
  }
});

// Get a file
app.get('/file/:filename', async (req, res) => {
  try {
    const file = await FileUpload.findOne({filename: req.params.filename});
    if (!file) {
      return res.status(404).send('File not found');
    } else {
      return res.send(file);
    }
  }
  catch (error) {
    res.status(500).send('Error getting file');
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));