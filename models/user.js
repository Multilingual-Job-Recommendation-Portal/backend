const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    disability: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pastJobs: {
        type: Array,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
});

userSchema.index({ email: 'unique' });

module.exports = mongoose.model('User', userSchema);
