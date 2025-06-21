import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

/**
 * Middleware to protect routes by checking if the user is authenticated.
 * It verifies the JWT token from the request cookies and attaches the user to the request object.
 * If the token is invalid or missing, it responds with a 401 Unauthorized status.
 */

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt; // Get the JWT token from cookies

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided' });
        }
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized, invalid token' });
        }

        const user = await User.findById(decoded.userId).select('-password'); // Find the user by ID and exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler

    } catch (error) {
        console.error('Error in protectRoute middleware:', error.message);
        res.status(401).json({ message: 'Unauthorized, token verification failed' });
    }
};