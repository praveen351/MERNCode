const express = require('express')
const { MongoClient } = require("mongodb");

const app = express()
const hostname = '127.0.0.1';
const port = 3000;
var db = "";
const uri = "mongodb://localhost:27017/?poolSize=20&writeConcern=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const books = [
   
]

app.get('/', function (req, res) {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.post('/mongo/connect', (req, res)=> {
    console.log(req.body.title);
    res.send(books);
});

app.get('/mongodb/connect', (async(req, res)=> {
    try {
        await client.connect();
        await client.db("nodeapi").command({ ping: 1 });
        console.log("Connected successfully to server");
      }
      finally {
        await client.close();
      }
}));

var server = app.listen(port, hostname, ()=> {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})