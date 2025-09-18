const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user_router.js');

const app = express();

// Enable CORS for Flutter app
app.use(cors({
    origin: ['http://localhost:3000', 'http://10.0.2.2:3000'], // Add your Flutter app's origin
    credentials: true
}));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// Routes
app.use('/api', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        message: 'Something went wrong!'
    });
});

module.exports = app;