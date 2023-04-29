const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Misid: { type: String },
    BatchId: { type: String },
    CandidateId: { type: String, required: true },
    CandidateName: { type: String, required: true },
    Email: { type: String, required: true },
    PanNumber: { type: String },
    DateOfBirth: { type: String },
    Gender: { type: String },
    Disability: { type: String },
    Address: { type: String },
    StateName: { type: String },
    DistrictName: { type: String },
    MandalName: { type: String },
    VillageName: { type: String },
    Pincode: { type: String },
    KnownName: { type: String },
    PreferredJobLocation: { type: String },
    MaritalStatusName: { type: String },
    TalentName: { type: String },
    SkillTyping: { type: String },
    PrevTrainingProviderName: { type: String },
    SkillsCovered: { type: String },
    TotExpYears: { type: Number },
    TotExpMonths: { type: Number },
    CDate: { type: Date, default: Date.now },
    role: { type: String, default: 'user' },
});

userSchema.index({ email: 'unique' });

module.exports = mongoose.model('User', userSchema);
