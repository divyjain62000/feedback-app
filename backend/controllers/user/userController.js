const User = require('@models/user/userModel');
const mongoose = require('mongoose');
const CustomError = require('@custom-errors/customError');
const { hashPassword } = require('@helper/password');

exports.findUserById = async (id) => {
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const user = await User.findOne({ _id: id });
            return user;
        }
        else {
            let customErr = {};
            customErr.idErr = 'invalid userId';
            throw new CustomError('Invalid user attributes', customErr);
        }
    } catch (error) {
        throw error;
    }
}

exports.findUserByEmailId = async (emailId) => {
    try {
        const user = await User.findOne({ emailId });
        return user;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

exports.findUserByMobileNumber = async (mobileNumber) => {
    try {
        const user = await User.findOne({ mobileNumber });
        return user;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

exports.saveUser = async (userData) => {
    userData.password = await hashPassword(userData.password);
    const user = new User(userData);
    await user.save();
}