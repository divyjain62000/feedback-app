const mongoose = require('mongoose');
const { roles } = require('@constants/role');


const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true, maxLength: 25 },
    lastName: { type: String, require: true, maxLength: 25 },
    emailId: { type: String, require: true, unique: true, maxLength: 325 },
    mobileNumber: { type: String, required: true, unique: true, maxLength: 10 },
    password: { type: String, required: true, maxLength: 300 },
    role: { type: String, enum: [roles.CUSTOMER, roles.ADMIN], required: true }
});

module.exports = mongoose.model('User', userSchema);