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
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    socialCatId: {
        type: Number,
        required: true
    },
    stateId: {
        type: Number,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    disabilityTypeId: {
        type: Number,
        required: true
    },
    skillMath: {
        type: Number,
        required: true
    },
    skillEnglish: {
        type: Number,
        required: true
    },
    skillReasoning: {
        type: Number,
        required: true
    },
    skillComputers: {
        type: Number,
        required: true
    },
    skillTyping: {
        type: Number,
        required: true
    },
    skillPersonal: {
        type: Number,
        required: true
    },
    skillInterpersonal: {
        type: Number,
        required: true
    },
    skillCommunication: {
        type: Number,
        required: true
    },
    skillOthers: {
        type: Number,
        required: true
    },
    y4jRecommends: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

userSchema.index({ email: 'unique' });

module.exports = mongoose.model('User', userSchema);
