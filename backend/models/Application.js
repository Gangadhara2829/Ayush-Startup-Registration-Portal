const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
    status: { type: String, enum: ['Submitted', 'Under Review', 'Approved', 'Rejected'], default: 'Submitted' },
    documents: [{ type: String }],
    submissionDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
