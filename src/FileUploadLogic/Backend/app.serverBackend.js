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

const currentUserId = '';

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
      bucketName: 'uploads',
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    };
  }
});

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('file'), async (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})

// Update the filename
app.put('/file/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const newFilename = req.body.filename;
    await FileUpload.findByIdAndUpdate(file => file._id === fileId, { filename: newFilename });
    res.send('Filename updated');
  }
  catch (error) {
    res.status(500).send('Error updating filename');
  }
});

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

app.post('/register',  async (req, res) => {
  try{
    const username = req.body.username;
    const password = req.body.password;

    // Überprüfen ob der Benutzer bereits existiert
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    // Passwort verschlüsseln
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer erstellen
    const newUser = new User({ username: username, password: hashedPassword});

    var t =  await newUser.save();

    currentUserId = t._id;

    res.redirect('/login?message=Benutzer wurde erstellt');
  }
  catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Überprüfen ob der Benutzer existiert
  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'Benutzer existiert nicht' });
  }

  // Überprüfen des Passwort
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(400).json({ message: 'Ungültiges Passwort' });
  }

  currentUserId = user._id;

  // Benutzer existiert und das Passwort ist gültig, leiten Sie den Benutzer zur Hauptseite weiter
  res.redirect('/main');
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));