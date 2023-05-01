const Job = require('../models/job');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const translationAPI = process.env.TRANSLATION_API;

exports.createJob = (req, res, next) => {
    const job = new Job({
        jobDescription: [
            {
                jobTitle: req.body.jobTitle,
                jobDescription: req.body.jobDescription,
                jobType: req.body.jobType,
                disabilityType: req.body.disabilityType,
                jobLocation: req.body.jobLocation,
                hrName: req.body.hrName,
                companyName: req.body.companyName,
                language: "en",
            }
        ],
        hrEmail: req.body.hrEmail,
        hrPhone: req.body.hrPhone,
        companyId: req.body.companyId,
        applications: req.body.applications,
        openings: req.body.openings,
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
        jobDescription: [
            {
                jobTitle: req.body.jobTitle,
                jobDescription: req.body.jobDescription,
                jobType: req.body.jobType,
                disabilityType: req.body.disabilityType,
                jobLocation: req.body.jobLocation,
                hrName: req.body.hrName,
                companyName: req.body.companyName,
                language: "en",
            }
        ],
        hrEmail: req.body.hrEmail,
        hrPhone: req.body.hrPhone,
        companyId: req.body.companyId,
        applications: req.body.applications,
        openings: req.body.openings,
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

exports.translateJob = async (req, res, next) => {
    const jobId = req.query._id;
    // search the data from the database
    const jobData = await Job.findById(jobId).then(job => {
        if (job) {
            return job;
        } else {
            res.status(404).json({ message: "Job not found!" });
        }
    })
    console.log("Translating job id " + jobId + " to all the available ")
    const jobTitle = jobData.jobDescription[0].jobTitle;
    const jobDescription = jobData.jobDescription[0].jobDescription;
    const jobType = jobData.jobDescription[0].jobType;
    const disabilityType = jobData.jobDescription[0].disabilityType;
    const jobLocation = jobData.jobDescription[0].jobLocation;
    const hrName = jobData.jobDescription[0].hrName;
    const companyName = jobData.jobDescription[0].companyName;

    const translatedJobTitle = await axios.post(translationAPI + '/translation', { data: jobTitle });
    const translatedJobDescription = await axios.post(translationAPI + '/translation', { data: jobDescription });
    const translatedJobType = await axios.post(translationAPI + '/translation', { data: jobType });
    const translatedDisabilityType = await axios.post(translationAPI + '/translation', { data: disabilityType });
    const translatedJobLocation = await axios.post(translationAPI + '/translation', { data: jobLocation });
    const translatedHrName = await axios.post(translationAPI + '/translation', { data: hrName });
    const translatedCompanyName = await axios.post(translationAPI + '/translation', { data: companyName });

    // update the job description array with the translated data

    const jobDescriptionArray = [
        {
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            jobType: jobType,
            disabilityType: disabilityType,
            jobLocation: jobLocation,
            hrName: hrName,
            companyName: companyName,
            language: "en"
        },
        {
            jobTitle: translatedJobTitle.data.data["as"],
            jobDescription: translatedJobDescription.data.data["as"],
            jobType: translatedJobType.data.data["as"],
            disabilityType: translatedDisabilityType.data.data["as"],
            jobLocation: translatedJobLocation.data.data["as"],
            hrName: translatedHrName.data.data["as"],
            companyName: translatedCompanyName.data.data["as"],
            language: "as"
        },
        {
            jobTitle: translatedJobTitle.data.data["hi"],
            jobDescription: translatedJobDescription.data.data["hi"],
            jobType: translatedJobType.data.data["hi"],
            disabilityType: translatedDisabilityType.data.data["hi"],
            jobLocation: translatedJobLocation.data.data["hi"],
            hrName: translatedHrName.data.data["hi"],
            companyName: translatedCompanyName.data.data["hi"],
            language: "hi"
        },
        {
            jobTitle: translatedJobTitle.data.data["mr"],
            jobDescription: translatedJobDescription.data.data["mr"],
            jobType: translatedJobType.data.data["mr"],
            disabilityType: translatedDisabilityType.data.data["mr"],
            jobLocation: translatedJobLocation.data.data["mr"],
            hrName: translatedHrName.data.data["mr"],
            companyName: translatedCompanyName.data.data["mr"],
            language: "mr"
        },
        {
            jobTitle: translatedJobTitle.data.data["ta"],
            jobDescription: translatedJobDescription.data.data["ta"],
            jobType: translatedJobType.data.data["ta"],
            disabilityType: translatedDisabilityType.data.data["ta"],
            jobLocation: translatedJobLocation.data.data["ta"],
            hrName: translatedHrName.data.data["ta"],
            companyName: translatedCompanyName.data.data["ta"],
            language: "ta"
        },
        {
            jobTitle: translatedJobTitle.data.data["bn"],
            jobDescription: translatedJobDescription.data.data["bn"],
            jobType: translatedJobType.data.data["bn"],
            disabilityType: translatedDisabilityType.data.data["bn"],
            jobLocation: translatedJobLocation.data.data["bn"],
            hrName: translatedHrName.data.data["bn"],
            companyName: translatedCompanyName.data.data["bn"],
            language: "bn"
        },
        {
            jobTitle: translatedJobTitle.data.data["kn"],
            jobDescription: translatedJobDescription.data.data["kn"],
            jobType: translatedJobType.data.data["kn"],
            disabilityType: translatedDisabilityType.data.data["kn"],
            jobLocation: translatedJobLocation.data.data["kn"],
            hrName: translatedHrName.data.data["kn"],
            companyName: translatedCompanyName.data.data["kn"],
            language: "kn"
        },
        {
            jobTitle: translatedJobTitle.data.data["or"],
            jobDescription: translatedJobDescription.data.data["or"],
            jobType: translatedJobType.data.data["or"],
            disabilityType: translatedDisabilityType.data.data["or"],
            jobLocation: translatedJobLocation.data.data["or"],
            hrName: translatedHrName.data.data["or"],
            companyName: translatedCompanyName.data.data["or"],
            language: "or"
        },
        {
            jobTitle: translatedJobTitle.data.data["te"],
            jobDescription: translatedJobDescription.data.data["te"],
            jobType: translatedJobType.data.data["te"],
            disabilityType: translatedDisabilityType.data.data["te"],
            jobLocation: translatedJobLocation.data.data["te"],
            hrName: translatedHrName.data.data["te"],
            companyName: translatedCompanyName.data.data["te"],
            language: "te"
        },
        {
            jobTitle: translatedJobTitle.data.data["gu"],
            jobDescription: translatedJobDescription.data.data["gu"],
            jobType: translatedJobType.data.data["gu"],
            disabilityType: translatedDisabilityType.data.data["gu"],
            jobLocation: translatedJobLocation.data.data["gu"],
            hrName: translatedHrName.data.data["gu"],
            companyName: translatedCompanyName.data.data["gu"],
            language: "gu"
        },
        {
            jobTitle: translatedJobTitle.data.data["ml"],
            jobDescription: translatedJobDescription.data.data["ml"],
            jobType: translatedJobType.data.data["ml"],
            disabilityType: translatedDisabilityType.data.data["ml"],
            jobLocation: translatedJobLocation.data.data["ml"],
            hrName: translatedHrName.data.data["ml"],
            companyName: translatedCompanyName.data.data["ml"],
            language: "ml"
        },
        {
            jobTitle: translatedJobTitle.data.data["pa"],
            jobDescription: translatedJobDescription.data.data["pa"],
            jobType: translatedJobType.data.data["pa"],
            disabilityType: translatedDisabilityType.data.data["pa"],
            jobLocation: translatedJobLocation.data.data["pa"],
            hrName: translatedHrName.data.data["pa"],
            companyName: translatedCompanyName.data.data["pa"],
            language: "pa"
        }
    ];

    // Update the job in the database with the translated data
    const result = await Job.findByIdAndUpdate(jobId, { $set: { jobDescription: jobDescriptionArray } }, { new: true });

    if (result) {
        res.status(200).send({ message: "Job updated successfully", data: result });
    } else {
        res.status(400).send({ message: "Job not found" });
    }
};