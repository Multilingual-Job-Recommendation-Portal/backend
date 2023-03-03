const Job = require('../models/job');
const dotenv = require('dotenv');
dotenv.config();

exports.createJob = (req, res, next) => {
    const job = new Job({
        age: req.body.age,
        edate: req.body.edate,
        gender: req.body.gender,
        jd: req.body.jd,
        jobtype: req.body.jobtype,
        location: req.body.location,
        noOfVacancies: req.body.noOfVacancies,
        sdate: req.body.sdate,
        title: req.body.title,
        disability: req.body.disability,
        skills: req.body.skills,

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
    .catch(error=>{
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
