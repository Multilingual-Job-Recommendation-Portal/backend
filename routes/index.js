const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Importing the controller
const UserController = require('../controllers/user');

// Creating a new user
router.post('/create', UserController.createUser);

// Getting a user by email
router.get('/email', UserController.getUserByEmail);

// Getting a user by id
router.get('/id', UserController.getUserById);

module.exports = router;