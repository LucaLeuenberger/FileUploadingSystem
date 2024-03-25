const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const FileUpload = require('./FileUpload.model');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User.model');
const router = express.Router();

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
    const files = await FileUpload.find({});
    res.send(files);
  }
  catch (error) {
    res.status(500).send('Error getting files');
  }
});

app.delete('/file/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    await FileUpload.deleteOne({_id: fileId});
    await FileChunk.deleteMany({fileId: fileId});
    res.send('File deleted');
  }
  catch (error) {
    res.status(500).send('Error getting file');
  }
});

app.post('/register', async (req, res) => {
  // Überprüfe ob der Benutzername bereits existiert
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(400).send('Benutzername ist bereits vergeben');
  }

  // Hashe das Passwort
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Erstellen einen neuen Benutzer
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  // Speichern des Benutzer
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Überprüfen ob der Benutzer existiert
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'Benutzer existiert nicht' });
  }

  // Überprüfen des Passwort
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(400).json({ message: 'Ungültiges Passwort' });
  }

  // Benutzer existiert und das Passwort ist gültig, leiten Sie den Benutzer zur Hauptseite weiter
  res.redirect('/main');
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));