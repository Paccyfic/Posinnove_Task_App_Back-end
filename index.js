require('dotenv').config();
const app = require('./app');
const db = require('./config/database');
const UserModel = require('./model/user_model.js')

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Task App Backend API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            registration: 'POST /api/registration',
            login: 'POST /api/login'
        },
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});