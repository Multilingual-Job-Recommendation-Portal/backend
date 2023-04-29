const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobSchema = new Schema({
    hrName: { type: String},
    hrEmail: { type: String},
    hrPhone: { type: String},
    companyName: { type: String},
    companyId : { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String},
    applications : {type: Array},
    jobType: { type: String},
    disabilityType: { type: String},
    openings : { type: Number},
    jobLocation: { type: String},
    postedDate: { type: Date, default: Date.now},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true},
    status: { type: String, default: 'active' },
});

jobSchema.index({ id: 'unique' });

module.exports = mongoose.model('Job', jobSchema);