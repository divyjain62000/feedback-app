const { roles } = require('@constants/role');
const CustomError = require('@custom-errors/customError');
const User = require('@models/user/userModel');
const { isValidEmailId, isOnlyDigits } = require('@helper/validator');
const userController = require('@controllers/user/userController');
const logger = require('@logger');
const { validatePassword } = require('@helper/password');
const { generateToken } = require('@helper/jwt');

exports.registerUser = async (req, res) => {
    try {

        const userData = {
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            emailId: req.body.emailId.trim(),
            mobileNumber: req.body.mobileNumber.trim(),
            role: req.body.role ? req.body.role.trim() : roles.CUSTOMER,
            password: req.body.password.trim()
        };
        let customErr = validateUser(userData);

        if (await userController.findUserByEmailId(userData.emailId) !== null) {
            customErr.emailId = 'Email-Id already exists';
        }
        if (await userController.findUserByMobileNumber(userData.mobileNumber) !== null) {
            customErr.mobileNumber = 'Mobile number already exists';
        }
        if (Object.keys(customErr).length > 0) throw new CustomError('User validation error', customErr);
        userController.saveUser(userData);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).json(error.errorJson);
        } else {
            logger.error(error)
            res.status(500).json({ error: 'Internal server error ' + error });
        }
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        let customErr = {};

        if (emailId === null || emailId.length === 0) {
            customErr.emailId = 'Email-Id required';
        } else if (!isValidEmailId(emailId)) {
            customErr.emailId = 'Invalid email-id';
        }
        if (password === null || password.length === 0) {
            customErr.password = 'Password required';
        }
        if (Object.keys(customErr).length > 0) throw new CustomError('User validation error', customErr);

        const user = await userController.findUserByEmailId(emailId);
        if (user === null) {
            return res.status(400).json({ authError: 'Invalid email-id or password' });
        } else {
            const match = await validatePassword(password, user.password);
            if (match === false) {
                return res.status(400).json({ authError: 'Invalid email-id or password' });
            }
        }

        const token = generateToken(user);
        res.status(200).json({
            token,
            userData: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                mobileNumber: user.mobileNumber,
                role: user.role
            }
        }); // Include the "role" in the response
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).json(error.errorJson);
        } else {
            res.status(500).json({ error: 'Internal server error' + error });
        }
    }
};

exports.logout = (req, res) => {
    const { userId, role } = req.body;
    removeFromNotificationSubscription(userId, role);
    res.status(200).json({ message: 'Logout successfully' })
}


const validateUser = (userData) => {
    const { firstName, lastName, emailId, mobileNumber, role, password } = userData;
    let customErr = {};
    if (firstName === null || firstName.length === 0) {
        customErr.firstName = 'First name required';
    }
    if (lastName === null || lastName.length === 0) {
        customErr.lastName = 'Last name required';
    }
    if (emailId === null || emailId.length === 0) {
        customErr.emailId = 'Email-Id required';
    } else if (!isValidEmailId(emailId)) {
        customErr.emailId = 'Invalid email-id';
    }
    if (mobileNumber === null || mobileNumber.length === 0) {
        customErr.mobileNumber = 'Mobile number required';
    } else if (!isOnlyDigits(mobileNumber) || mobileNumber.length !== 10) {
        customErr.mobileNumber = 'Invalid mobile number';
    }
    if (role === null || !roles.hasOwnProperty(role)) {
        isError = true;
        customErr.roleErr = 'Role required';
    }
    if (password === null || password.length === 0) {
        customErr.password = 'Password required';
    }
    return customErr;
}
