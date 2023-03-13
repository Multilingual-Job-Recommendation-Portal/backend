const express = require('express');
const router = express.Router();

// Importing the Admin Controller
const AdminController = require('../controllers/admin');

// create a admin
router.post('/create', AdminController.createAdmin);

// get the admin by email
router.get('/email', AdminController.getAdmin);

module.exports = router;