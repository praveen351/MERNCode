// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("nodeapi");
//   dbo.collection("user").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017/?poolSize=20&writeConcern=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("nodeapi").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run()
