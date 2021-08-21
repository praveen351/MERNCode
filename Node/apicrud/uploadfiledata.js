const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
// const router = express.Router();
const dbConfig = require('./development.config.js');
const mongoose = require('mongoose');
const QuestionSet = require('./QuestionSet.model.js');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the express-mongo-app database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const hostname = '127.0.0.1';
const port = 3001;
var fdata = {
  qvalue: '',
  qtype: '',
  answertype: '',
  answerlist: '',
  filename: ''
}

const storages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    fdata.filename = Date.now() + '-' + file.originalname
    cb(null, fdata.filename)
  }
})

// var save = multer({ storage: storage }).single(fileselection)
var save = multer({ storage: storages }).single('file')
app.post('/save', (req, res, next) => {
  save(req, res, (err) => {
    console.log(req.body.qvalue)

    fdata.qvalue = req.body.qvalue
    fdata.answertype = req.body.answertype
    fdata.answerlist = req.body.answerlist
    fdata.qtype = req.body.qtype

    if (fdata.qtype !== 'text') {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
    }
    const Question = new QuestionSet({
      qvalue: fdata.qvalue,
      qtype: fdata.qtype,
      answertype: fdata.answertype,
      answerlist: fdata.answerlist,
      filename: fdata.filename
    });
    console.log(Question)
    // Save Question in the database
    Question.save()
      .then(oquestion => {
        console.log(oquestion)
      }).catch(err => {
        console.log({
          message: err.message || "Some error occurred while creating the Question."
        });
      });
    return res.status(200).send(req.file)
  })
});
// require('./Question.routes.js')(app);

var server = app.listen(port, hostname, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})