const express = require('express');
const router = express.Router();

// Importing the Admin Controller
const AdminController = require('../controllers/admin');

// get the admin by email
router.get('/email', AdminController.getAdmin);