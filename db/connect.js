const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:xxxxxxx@cluster0.cthiqik.mongodb.net/[yourtablename]?retryWrites=true&w=majority"

const client = new MongoClient(uri);


module.exports = client;
