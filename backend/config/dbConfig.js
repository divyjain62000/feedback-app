const mongoose = require('mongoose');
const logger = require('./logger');
const userController = require('@controllers/user/userController');
const { roles } = require('@constants/role');

const initDBConnection = () => {
    mongoose.connect(process.env.DB_URL)
        .then(async () => {
            logger.info(`Database connection established successfully`);
            await initDB();
            logger.info(`Database initialized`);
        })
        .catch(error => {
            logger.error("Unable to connect with database", error);
            process.exit(1);
        });
};

const initDB = async () => {
    const user = await userController.findUserByEmailId('admin@admin.com');
    if (user === null) {
        const userData = {
            firstName: 'Admin',
            lastName: 'Admin',
            emailId: 'admin@admin.com',
            mobileNumber: '9977887766',
            role: roles.ADMIN,
            password: 'admin'
        };
        await userController.saveUser(userData);
        logger.info("Admin created");
    }
}

module.exports = initDBConnection;
