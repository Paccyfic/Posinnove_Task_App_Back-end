const UserModel = require('../model/user_model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Add this to your environment variables or use a secure secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

class UserService{
    static async registerUser(username,email,password){
        try{
            // Check if user already exists
            const existingUser = await UserModel.findOne({ email });
            if(existingUser){
                throw { status: 400, message: 'User already exists with this email' };
            }

            const createUser = new UserModel({username,email,password});
            const savedUser = await createUser.save();
            
            // Generate JWT token for immediate login after registration
            const token = jwt.sign(
                { 
                    userId: savedUser._id, 
                    email: savedUser.email,
                    username: savedUser.username 
                }, 
                JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return { 
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }, 
                token 
            };
        }catch(err){
            throw err;
        }
    }

    static async loginUser(email, password){
        try{
            const existingUser = await UserModel.findOne({ email });
            if(!existingUser){
                throw { status: 401, message: 'Invalid email or password' };
            }

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordValid){
                throw { status: 401, message: 'Invalid email or password' };
            }

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: existingUser._id, 
                    email: existingUser.email,
                    username: existingUser.username 
                }, 
                JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return { 
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email
                }, 
                token 
            };
        }catch(err){
            throw err;
        }
    }

    static async verifyToken(token){
        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await UserModel.findById(decoded.userId).select('-password');
            if(!user){
                throw { status: 401, message: 'Invalid token' };
            }
            return user;
        }catch(err){
            throw { status: 401, message: 'Invalid or expired token' };
        }
    }
}

module.exports = UserService;