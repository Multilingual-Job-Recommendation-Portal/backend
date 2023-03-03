const express = require('express');
const router = express.Router();

// Importing the controller
const JobController = require('../controllers/job');

// Creating a new job
router.post('/create', JobController.createJob);


// Getting a job by id
router.get('/id', JobController.getJobById)

module.exports = router;