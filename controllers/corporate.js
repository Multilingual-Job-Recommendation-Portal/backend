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

// update corporate details
exports.updateCorporate = async (req, res, next) => {
    const userId = req.body._id;
    const update = {
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        address: req.body.address
    };

    const updateCorporateData = await Corporate.findByIdAndUpdate(userId, update, { new: true });
    if (!updateCorporateData) {
        res.status(500).json({
            message: "Updating corporate failed!"
        })
        return;
    }
    res.status(200).json({
        message: "Corporate updated successfully",
        corporate: updateCorporateData
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