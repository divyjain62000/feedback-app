// Middleware for JWT authentication
const jwt = require('jsonwebtoken');
const { roles } = require('@constants/role');
const User = require('@models/user/userModel');

exports.verifySocketToken = (socket, next) => {

    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error'));
        }

        const user = await User.findById(decoded.id);
        if (!user || user.role !== roles.ADMIN) {
            return next(new Error('Authorization error'));
        }
        
        // Store decoded JWT payload in socket for future use
        socket.decoded = decoded;
        next();
    });
};