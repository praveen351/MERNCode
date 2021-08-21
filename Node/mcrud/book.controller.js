const Book = require('./book.model.js');

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request because in model we required the title
    if (!req.body.title) {
        return res.status(400).send({
            message: "Please enter book title."
        });
    }

    // Create a book
    const book = new Book({
        title: req.body.title,
        author: req.body.author || 'IT Jugadu'
    });

    // Save Book in the database
    book.save()
        .then(oBook => {
            res.send(oBook);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
};
exports.getAll = (req, res) => {
    Book.find()
        .then(oBook => {
            res.send(oBook);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the book."
            });
        });
};
exports.getById = (req, res) => {
    Book.findById(req.params.bookId)
        .then(oBook => {
            if (!oBook) {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            res.send(oBook);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
};
exports.delete = (req, res) => {
    Book.deleteOne({ _id: req.params.bookId })
        .then(oBook => {
            if (!oBook) {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            res.send(oBook);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
};
exports.update = (req, res) => {
    Book.findById(req.params.bookId)
        .then(oBook => {
            if (!oBook) {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            let bookdata = {
                title: req.body.title,
                author: req.body.author
            }
            Book.updateOne({ _id: req.params.bookId }, bookdata).then(oubooks => {
                res.send(oubooks);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the Book."
                });
            });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not exist with id " + req.params.bookId
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
};