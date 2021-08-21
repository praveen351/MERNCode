module.exports = (app) => {
    const questions = require('./Question.controller.js');
 
    // Create a new Book
    app.post('/question', questions.create);
 
    // Get all Books
    app.get('/questions', questions.getAll);
 
    // Get a single Book with bookId
    app.get('/questions/:questionId', questions.getById);
 
    // // Update a Book with bookId
    app.put('/questions/:questionId', questions.updateById);
 
    // // Delete a Book with bookId
    app.delete('/questions/:questionId', questions.deleteById);
 }