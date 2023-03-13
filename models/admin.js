const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

adminSchema.index({ email: 'unique' });

module.exports = mongoose.model('Admin', adminSchema);