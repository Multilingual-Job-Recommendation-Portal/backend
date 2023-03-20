const Corporate = require('../models/corporate');
const Job = require('../models/job');

// get corporate details by email
exports.getCorporate = (req, res, next) => {
    Corporate.findOne({ email: req.body.email }).then(corporate => {
        if (corporate) {
            res.status(200).json(corporate);
        } else {
            res.status(404).json({ message: "Corporate not found!" });
        }
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching corporate failed!"
            })
        });
}

// Create a corporate
exports.createCorporate = (req, res, next) => {
    const corporate = new Corporate({
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        address: req.body.address,
        role: "corporate"
    });
    corporate.save().then(createdCorporate => {
        res.status(201).json({
            message: "Corporate added successfully",
            corporate: {
                ...createdCorporate,
                id: createdCorporate._id
            }
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Creating a corporate failed!"
            })
        });
}

// TODO: Needed to debug

// update corporate details
exports.updateCorporate = (req, res, next) => {
    const corporate = new Corporate({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        address: req.body.address,
        role: "corporate"
    });
    Corporate.updateOne({ _id: req.body.id }, corporate).then(result => {
        if (result.modifiedCount == 1) {
            res.status(200).json({ message: "Update successful!" });
        } else if (result.matchedCount == 1) {
            res.status(200).json({ message: "No changes to update!" });
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update corporate!"
            })
        });
}

// delete corporate
exports.deleteCorporate = (req, res, next) => {
    Corporate.deleteOne({ email: req.body.email }).then(result => {
        if (result.deletedCount == 1) {
            res.status(200).json({ message: "Deletion successful!" });
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Deleting corporate failed!"
            })
        });
}

// get all corporates
exports.getCorporates = (req, res, next) => {
    Corporate.find().then(documents => {
        res.status(200).json({
            message: "Corporates fetched successfully!",
            corporates: documents
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching corporates failed!"
            })
        });
}

// get all jobs created by a corporate with id
exports.getJobs = (req, res, next) => {
    Job.find({ companyID: req.params.id }).then(documents => {
        res.status(200).json({
            message: "Jobs fetched successfully!",
            jobs: documents
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching jobs failed!"
            })
        });
}