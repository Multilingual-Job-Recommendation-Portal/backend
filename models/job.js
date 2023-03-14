const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobSchema = new Schema({
    jobCode: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
    jobType: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    jobLocation: {
        type: Number,
        required: true
    },
    noOfVacancies: {
        type: Number,
        required: true
    },
    disabilityTypeId: {
        type: Number,
        required: true
    },
    qualificationIds: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    skillSet: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    annualSalary: {
        type: Number,
        required: true
    },
    incentives: {
        type: String,
        required: true
    },
    facilities: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    companyID: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    corporateStatus: {
        type: Number,
        required: true
    },
});

jobSchema.index({ id: 'unique' });

module.exports = mongoose.model('Job', jobSchema);