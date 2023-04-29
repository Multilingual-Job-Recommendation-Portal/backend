const Job = require('../models/job');
const dotenv = require('dotenv');
dotenv.config();

exports.createJob = (req, res, next) => {
    const job = new Job({
        hrName: req.body.hrName,
        hrEmail: req.body.hrEmail,
        hrPhone: req.body.hrPhone,
        companyName: req.body.companyName,
        companyId: req.body.companyId,
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        applications: req.body.applications,
        jobType: req.body.jobType,
        disabilityType: req.body.disabilityType,
        openings: req.body.openings,
        jobLocation: req.body.jobLocation,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
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
    Job.findById(req.query.id).then(job => {
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
exports.updateJob = async (req, res, next) => {
    const jobId = req.body._id;
    const jobData = {
        hrName: req.body.hrName,
        hrEmail: req.body.hrEmail,
        hrPhone: req.body.hrPhone,
        companyName: req.body.companyName,
        companyId: req.body.companyId,
        jobTitle: req.body.jobTitle,
        jobDescription: req.body.jobDescription,
        applications: req.body.applications,
        jobType: req.body.jobType,
        disabilityType: req.body.disabilityType,
        openings: req.body.openings,
        jobLocation: req.body.jobLocation,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };
    console.log(jobData);
    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });
    if (!updatedJob) {
        res.status(500).json({
            message: "Updating job failed!"
        })
        return;
    }
    res.status(200).json({
        message: "Update successful!",
        job: updatedJob
    });
}

// delete the job by id
exports.deleteJob = (req, res, next) => {
    Job.deleteOne({ _id: req.body._id }).then(result => {
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

// get all jobs by company id
exports.getJobsByCompanyId = (req, res, next) => {
    Job.find({ companyId: req.query.companyId }).then(documents => {
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