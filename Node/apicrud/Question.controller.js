const QuestionSet = require('./QuestionSet.model.js');

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request because in model we required the title
    if (!req.body.qvalue) {
        return res.status(400).send({
            message: "Please enter Question."
        });
    }
    if (!req.body.qtype) {
        return res.status(400).send({
            message: "Please provide Question type."
        });
    } if (!req.body.answertype) {
        return res.status(400).send({
            message: "Please provide Answer type."
        });
    }
    // if (!req.body.answerlist) {
    //     return res.status(400).send({
    //         message: "Please provide Answer list."
    //     });
    // }
    const Question = new QuestionSet({
        qvalue: req.body.qvalue,
        qtype: req.body.qtype,
        answertype: req.body.answertype,
        answerlist: req.body.answerlist
    });
    // Save Question in the database
    Question.save()
        .then(oquestion => {
            res.send(oquestion);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Question."
            });
        });
};
exports.getAll = (req, res) => {
    QuestionSet.find()
        .then(oquestion => {
            res.send(oquestion);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Question."
            });
        });
};
exports.getById = (req, res) => {
    QuestionSet.findById(req.params.questionId)
        .then(oquestion => {
            if (!oquestion) {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            res.send(oquestion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error retrieving question with id " + req.params.questionId
            });
        });
};
exports.deleteById = (req, res) => {
    QuestionSet.deleteOne({ _id: req.params.questionId })
        .then(oquestion => {
            if (!oquestion) {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            res.send(oquestion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error retrieving question with id " + req.params.questionId
            });
        });
};
exports.updateById = (req, res) => {
    QuestionSet.findById(req.params.questionId)
        .then(oquestion => {
            if (!oquestion) {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            let qdata = {
                qvalue: (req.body.qvalue === undefined) ? oquestion.qvalue : req.body.qvalue,
                qtype: (req.body.qtype === undefined) ? oquestion.qtype : req.body.qtype,
                answertype: (req.body.answertype === undefined) ? oquestion.answertype : req.body.answertype,
                answerlist: (req.body.answerlist === undefined) ? oquestion.answerlist : req.body.answerlist
            }
            QuestionSet.updateOne({ _id: req.params.questionId }, qdata).then(ouquestion => {
                res.send(ouquestion);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the Question."
                });
            });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not exist with id " + req.params.questionId
                });
            }
            return res.status(500).send({
                message: "Error retrieving question with id " + req.params.questionId
            });
        });
};