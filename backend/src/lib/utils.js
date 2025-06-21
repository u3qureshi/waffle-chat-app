import jwt from 'jsonwebtoken';
/**
 * Generates a JWT token for the user and sets it as a cookie in the response.
 * @param {string} userId - The ID of the user for whom the token is generated.
 * @param {object} res - The response object to set the cookie.
 * @returns {string} The generated JWT token.
 */

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '20d', // Token expiration time
    });

    res.cookie('jwt', token, {
        maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days in milliseconds
        httpOnly: true, // Prevents XSS client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
    });
    
    return token;
}