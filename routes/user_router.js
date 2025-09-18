const router = require('express').Router();
const UserController = require('../controller/user_controller.js');
const authenticateToken = require('../middleware/auth_middleware.js');

// Public routes
router.post('/registration', UserController.register);
router.post('/login', UserController.login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, UserController.getProfile);
router.get('/dashboard', authenticateToken, UserController.dashboard);

module.exports = router;