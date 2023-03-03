const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const  jobSchema = new Schema({
    age:{
        type: Number,
        required: true
    },
    edate:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    jd:{
        type: String,
        required: true
    },
    jobtype:{
        type: String,
        required: true
    },
    location:{
        type: Array,
        required: true
    },
    noOfVacancies:{
        type: Number,
        required: true
    },
    sdate:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    disability:{
        type: Array,
        required: true
    },
    skills:{
        type: Array,
        required: true
    }
});

jobSchema.index({ id: 'unique' });

module.exports = mongoose.model('Job', jobSchema);