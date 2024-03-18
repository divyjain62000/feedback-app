const { verifySocketToken } = require('@middleware/auth/socketAuthMiddleware');
const logger = require('@logger');
const userController = require('@controllers/user/userController');

exports.io = null;

exports.initSocket = (socketIO) => {
    this.io = socketIO
    this.io.use(verifySocketToken);
    this.io.on("connection", (socket) => {
        logger.info("Client connected")
    });
}

exports.emitFeedbackToAllAdmin = async (feedback) => {

    const user = await userController.findUserById(feedback.userId);
    const kFeedback = {}
    kFeedback._id = feedback._id;
    kFeedback.public = feedback.public;
    kFeedback.rating = feedback.rating;
    kFeedback.message = feedback.message;
    kFeedback.timestamp = feedback.timestamp;
    kFeedback.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        mobileNumber: user.mobileNumber
    }
    this.io.emit('new_feedback', JSON.stringify(kFeedback));
}


