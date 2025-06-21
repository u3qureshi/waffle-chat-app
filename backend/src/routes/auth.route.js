import express from 'express';
import { login, logout, signup, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

// Route to update user profile, which is protected by the protectRoute middleware
// This means only authenticated users can access this route
// The updateProfile controller will handle the logic for updating the user's profile
router.put('/update-profile', protectRoute, updateProfile);

// Route to check if the user is authenticated
// This route is also protected by the protectRoute middleware
// The checkAuth controller will return the authenticated user's information, 
// this is used when the frontend needs to verify if a user is logged in such as when the app loads or refreshes
router.get('/check', protectRoute, checkAuth);

export default router;