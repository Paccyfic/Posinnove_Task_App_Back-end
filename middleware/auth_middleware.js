const UserService = require('../services/user_service');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                status: false, 
                message: 'Access token required' 
            });
        }

        const user = await UserService.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ 
            status: false, 
            message: error.message || 'Invalid token' 
        });
    }
};

module.exports = authenticateToken;