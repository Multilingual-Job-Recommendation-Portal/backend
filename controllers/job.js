const Job = require('../models/job');
const dotenv = require('dotenv');
dotenv.config();

exports.createJob = (req, res, next) => {
    const job = new Job({
        jobCode: req.body.jobCode,
        jobTitle: req.body.jobTitle,
        jobDesc: req.body.jobDesc,
        jobType: req.body.jobType,
        experience: req.body.experience,
        jobLocation: req.body.jobLocation,
        noOfVacancies: req.body.noOfVacancies,
        disabilityTypeId: req.body.disabilityTypeId,
        qualificationIds: req.body.qualificationIds,
        age: req.body.age,
        gender: req.body.gender,
        skillSet: req.body.skillSet,
        responsibilities: req.body.responsibilities,
        languages: req.body.languages,
        annualSalary: req.body.annualSalary,
        incentives: req.body.incentives,
        facilities: req.body.facilities,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        companyID: req.body.companyID,
        companyName: req.body.companyName,
        address: req.body.address,
        corporateStatus: req.body.corporateStatus,
    });

    job.save().then(createdJob => {
        res.status(201).json({
            message: 'Job added successfully',
            job: {
                ...createdJob,
                id: createdJob._id
            }
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Creating a job failed!"
            })
        })

}

// get the user by id
exports.getJobById = (req, res, next) => {
    Job.findById(req.body.id).then(job => {
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: "Job not found!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching job failed!"
            })
        });
}

// update the job by id
exports.updateJob = (req, res, next) => {
    const job = new Job({
        jobCode: req.body.jobCode,
        jobTitle: req.body.jobTitle,
        jobDesc: req.body.jobDesc,
        jobType: req.body.jobType,
        experience: req.body.experience,
        jobLocation: req.body.jobLocation,
        noOfVacancies: req.body.noOfVacancies,
        disabilityTypeId: req.body.disabilityTypeId,
        qualificationIds: req.body.qualificationIds,
        age: req.body.age,
        gender: req.body.gender,
        skillSet: req.body.skillSet,
        responsibilities: req.body.responsibilities,
        languages: req.body.languages,
        annualSalary: req.body.annualSalary,
        incentives: req.body.incentives,
        facilities: req.body.facilities,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        companyID: req.body.companyID,
        companyName: req.body.companyName,
        address: req.body.address,
        corporateStatus: req.body.corporateStatus,
        _id: req.body.id
    });
    Job.updateOne({ _id: req.body.id }, job).then(result => {
        console.log(result)
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Update successful!" });
        } else if (result.matchedCount == 1) {
            res.status(200).json({ message: "No Updates found" });
        }
        else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update job!"
            })
        }
        );
}

// delete the job by id
exports.deleteJob = (req, res, next) => {
    Job.deleteOne({ _id: req.body.id }).then(result => {
        if (result.deletedCount == 1) {
            res.status(200).json({ message: "Deletion successful!" });
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Deleting job failed!"
            })
        });
}

// get all jobs
exports.getJobs = (req, res, next) => {
    Job.find().then(documents => {
        res.status(200).json({
            message: 'Jobs fetched successfully!',
            jobs: documents
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching jobs failed!"
            })
        });
}