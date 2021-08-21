const QuestionSet = require('./QuestionSet.model.js');

// Create and Save a new Question
exports.create = (req, coldata) => {
    // Validate request because in model we required the title
    if (!req.qvalue) {
        return {
            message: "Please enter Question."
        };
    }
    if (!req.qtype) {
        return {
            message: "Please provide Question type."
        };
    } if (!req.answertype) {
        return {
            message: "Please provide Answer type."
        };
    }
    const Question = new QuestionSet({
        qvalue: req.qvalue,
        qtype: req.qtype,
        answertype: req.answertype,
        answerlist: req.answerlist,
        filename: req.filename
    });
    // Save Question in the database
    Question.save()
        .then(oquestion => {
            coldata(oquestion);
        }).catch(err => {
            return {
                message: err.message || "Some error occurred while creating the Question."
            };
        });
};
exports.getAll = (coldata) => {
    QuestionSet.find()
        .then(oquestion => {
            coldata(oquestion);
        }).catch(err => {
            return {
                message: err.message || "Some error occurred while retrieving the Question."
            };
        });
};
exports.getById = (req, coldata) => {
    let result = {}
    QuestionSet.findById(req)
        .then(oquestion => {
            if (!oquestion) {
                return {
                    message: "Question not exist with id " + req
                };
            }
            coldata(oquestion)
            // return oquestion;
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return {
                    message: "Question not exist with id " + req
                };
            }
            return {
                message: "Error retrieving question with id " + req
            };
        });
    return result;
};
exports.deleteById = (req,coldata) => {
    QuestionSet.deleteOne({ _id: req.questionId })
        .then(oquestion => {
            if (!oquestion) {
                return {
                    message: "Question not exist with id " + req.questionId
                };
            }
            coldata(oquestion)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return {
                    message: "Question not exist with id " + req.questionId
                };
            }
            return {
                message: "Error retrieving question with id " + req.questionId
            };
        });
};

exports.updateById = (req, coldata) => {
    let qdata = {
        qvalue: req.qvalue,
        qtype: req.qtype,
        answertype: req.answertype,
        answerlist: req.answerlist,
        filename: req.filename
    }
    QuestionSet.updateOne({ _id: req.questionId }, qdata).then(ouquestion => {
        coldata(ouquestion)
    }).catch(err => {
        return {
            message: err.message || "Some error occurred while updating the Question."
        };
    });
};