const express = require('express');
const router = express.Router();

// Importing the Corporate controller
const CorporateController = require('../controllers/corporate');

// Creating a new corporate
router.post('/create', CorporateController.createCorporate);

// Getting a corporate by email
router.get('/email', CorporateController.getCorporate);

// updating a corporate by email
router.put('/update', CorporateController.updateCorporate);

// deleting a corporate by email
router.delete('/delete', CorporateController.deleteCorporate);

// get all corporates
router.get('/all', CorporateController.getCorporates);

// get all jobs created by a corporate with id passed as parameter  
router.get('/jobs/:id', CorporateController.getJobs);

module.exports = router;