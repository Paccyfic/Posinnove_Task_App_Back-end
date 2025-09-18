const UserService = require('../services/user_service.js');

exports.register = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body;
        
        // Basic validation
        if(!username || !email || !password){
            return res.status(400).json({
                status: false, 
                message: "All fields are required"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                status: false, 
                message: "Password must be at least 6 characters long"
            });
        }

        const result = await UserService.registerUser(username,email,password);

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                user: result.user,
                token: result.token
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(error.status || 500).json({
            status: false,
            message: error.message || "Registration failed"
        });
    }
}

exports.login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        
        // Basic validation
        if(!email || !password){
            return res.status(400).json({
                status: false, 
                message: "Email and password are required"
            });
        }

        const result = await UserService.loginUser(email,password);

        res.json({
            status: true,
            message: "Login successful",
            data: {
                user: result.user,
                token: result.token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(error.status || 500).json({
            status: false,
            message: error.message || "Login failed"
        });
    }
}

exports.getProfile = async(req,res,next)=>{
    try {
        // This will be called on protected routes
        res.json({
            status: true,
            message: "Profile retrieved successfully",
            data: {
                user: req.user
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            status: false,
            message: "Failed to get profile"
        });
    }
}

exports.dashboard = async(req,res,next)=>{
    try {
        res.json({
            status: true,
            message: "Welcome to your dashboard!",
            data: {
                user: req.user,
                welcomeMessage: `Hello ${req.user.username}, welcome to your dashboard!`
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            status: false,
            message: "Failed to load dashboard"
        });
    }
}