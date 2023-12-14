const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:xxxxxxx@cluster0.cthiqik.mongodb.net/acme?retryWrites=true&w=majority"

const client = new MongoClient(uri);


module.exports = client;
