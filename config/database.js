const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_app';

const connection = mongoose.createConnection(MONGODB_URI).on('error', (error) => {
    console.log('Error connecting to MongoDB', error);
}).on('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = connection;