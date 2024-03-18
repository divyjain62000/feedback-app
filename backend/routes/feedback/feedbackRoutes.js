const express = require('express');
const router = express.Router();
const feedbackController = require('@controllers/feedback/feedbackController');
const { verifyToken, authorizeRoles } = require('@middleware/auth/authMiddleware');
const { roles } = require('@constants/role.js');

router.post('/v1/submit', verifyToken, authorizeRoles([roles.CUSTOMER]), feedbackController.submitFeedback);
router.get('/v1/get-all', verifyToken, authorizeRoles([roles.ADMIN, roles.CUSTOMER]), feedbackController.getAllFeedback);
router.put('/v1/change_-visibility/:_id', verifyToken, authorizeRoles([roles.ADMIN]), feedbackController.changeFeedbackVisibility);


module.exports = router;
