const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI ;

const connection = mongoose.createConnection(MONGODB_URI).on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
}).on('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = connection;