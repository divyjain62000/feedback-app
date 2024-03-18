const express = require('express');
const router = express.Router();
const authController = require('@controllers/auth/authController');

router.post('/v1/register', authController.registerUser);
router.post('/v1/login', authController.loginUser);

module.exports = router;
