const CustomError = require('@custom-errors/customError');
const Feedback = require('@models/feedback/feedbackModel');
const logger = require('@logger');
const socketController = require('@controllers/socket/socketController');
const userController = require('@controllers/user/userController');
const { roles } = require('@constants/role');

exports.submitFeedback = async (req, res) => {
    try {
        const feedbackData = {
            message: req.body.message.trim(),
            rating: req.body.rating
        };
        let customErr = validateFeedback(feedbackData);
        if (Object.keys(customErr).length > 0) throw new CustomError('Feedback validation error', customErr);
        feedbackData.userId = req.user._id;
        const feedback = new Feedback(feedbackData);
        feedback.save();
        socketController.emitFeedbackToAllAdmin(feedback);
        res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).json(error.errorJson);
        } else {
            logger.error(error)
            res.status(500).json({ error: 'Internal server error ' + error });
        }
    }
}

exports.changeFeedbackVisibility = async (req, res) => {
    try {
        const _id = req.params._id;
        const public = req.body.public;
        await Feedback.updateOne({ _id }, { $set: { public } });
        res.status(200).json({ message: 'Feedback visibility changed successfully!' });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).json(error.errorJson);
        } else {
            logger.error(error)
            res.status(500).json({ error: 'Internal server error ' + error });
        }
    }
}

exports.getAllFeedback = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const options = {
            page,
            limit: pageSize
        }
        const userRole = req.user.role;
        let feedbackData
        if (userRole === roles.ADMIN) {
            feedbackData = await Feedback.paginate({}, options);
        } else {
            feedbackData = await Feedback.paginate({ public: true }, options);
        }
        let newDocs = []
        for (let feedback of feedbackData.docs) {
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
            };
            if (userRole === roles.ADMIN) {
                kFeedback.user.emailId = user.emailId;
                kFeedback.user.mobileNumber = user.mobileNumber;
            }
            newDocs.push(kFeedback);
        }
        feedbackData.docs = newDocs;
        // Now all modifications should be applied
        // console.log(feedbackData.docs);
        res.status(200).json(feedbackData);
    } catch (error) {
        logger.error(error)
        res.status(500).json({ error: 'Internal server error ' + error });
    }
}

const validateFeedback = (feedbackData) => {
    const { message, rating } = feedbackData;
    let customErr = {};
    if (message === null || message.length === 0) {
        customErr.messageErr = 'Message required';
    }
    if (rating < 1 || rating > 5) {
        customErr.ratingErr = 'Invalid rating'
    }
    if (Object.keys(customErr).length > 0) throw new CustomError('Feedback validation error', customErr);
    return customErr;
}