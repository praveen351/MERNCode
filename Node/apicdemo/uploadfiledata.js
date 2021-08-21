const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
let fs = require('fs');
// const router = express.Router();
const dbConfig = require('./development.config.js');
const mongoose = require('mongoose');
const questions = require('./Question.controller.js');

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

const hostname = '127.0.0.1';
const port = 3001;
var fdata = {
  qvalue: '',
  qtype: '',
  answertype: '',
  answerlist: '',
  filename: '',
  questionId: ''
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

var save = multer({ storage: storages }).single('file')

app.post('/save', (req, res, next) => {
  save(req, res, (err) => {
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
    questions.create(fdata, (resdata) => {
      return res.status(200).send(resdata)
    })
  })
});

app.get('/getAll', (req, res, next) => {
  questions.getAll((resdata) => {
    return res.status(200).send(resdata)
  })
});

app.get('/get/:questionId', (req, res, next) => {
  questions.getById(req.params.questionId, (resdata)=>{
    return res.status(200).send(resdata)
  })
});

app.delete('/delete/:questionId', (req, res, next) => {
  questions.deleteById(req.params.questionId , (resdata)=>{
    return res.status(200).send(resdata)
  })
});

app.put('/update/:questionId', (req, res, next) => {
  save(req, res, (err) => {
    fdata.qvalue = req.body.qvalue
    fdata.answertype = req.body.answertype
    fdata.answerlist = req.body.answerlist
    fdata.qtype = req.body.qtype
    fdata.questionId = req.params.questionId

    if (fdata.qtype !== 'text') {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
    }
    questions.getById(fdata.questionId, (resultdata) => {
      questions.updateById(fdata, (resdata) => {
        if (resdata.ok === 1)
          resultdata.filename === fdata.filename ? console.log('raja') : fs.unlinkSync('public/' + resultdata.filename);
      })
    })
    return res.status(200).send(fdata)
  })
});

var server = app.listen(port, hostname, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})