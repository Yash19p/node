const mongoose = require('mongoose');
require('dotenv').config();

// define the MongoDB connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.DB_URL;

//set up Mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
// mongose maintains a default object representing the mongoDB connection.
const db = mongoose.connection;

//default event listeners for database connection
db.on('connected',()=> {
    console.log('Connected to MongoaDB server');
});

db.on('error',()=> {
    console.log('MongoaDB connection error');
});

db.on('disconnected',()=> {
    console.log('MongoaDB disconnected');
});

//export the database connection
module.exports = db;


