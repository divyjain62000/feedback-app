const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRY });
}