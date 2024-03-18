const logger = require('@logger');
const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    try {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        logger.error(error);
        throw new Error('Error hashing password');
    }
}

exports.validatePassword = async (plaintextPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plaintextPassword, hashedPassword);
        return match;
    } catch (error) {
        logger.error(error);
        throw new Error('Error validating password');
    }
}