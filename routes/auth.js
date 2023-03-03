const express = require('express');
const router = express.Router();

// Importing the controller
const AuthController = require('../controllers/auth');

// Getting a user by google login
router.get('/google', AuthController.getUserByGoogleLogin);

module.exports = router;