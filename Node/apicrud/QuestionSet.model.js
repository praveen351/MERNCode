const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
   qvalue: {
      type: String,
      required: true
   },
   qtype: {
      type: String,
      required: true
   },
   answertype: {
      type: String,
      required: true
   },
   answerlist: {
      type: String
   },
   filename: {
      type: String
   }
}, {
   timestamps: true
});

module.exports = mongoose.model('QuestionSet', QuestionSchema);