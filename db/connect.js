const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:29906810@cluster0.cthiqik.mongodb.net/acme?retryWrites=true&w=majority"

const client = new MongoClient(uri);


module.exports = client;
