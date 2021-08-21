const express = require('express');
const dbConfig = require('./development.config.js');
const mongoose = require('mongoose');

// create express app
const app = express();

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



// define a simple route
app.get('/', (req, res) => {
   res.json({"message": "Welcome to ExpressMongoApp application. Created by IT Jugadu"});
});

require('./book.routes.js')(app);

// listen for requests
app.listen(3000, () => {
   console.log("Server is listening on port 3000");
});