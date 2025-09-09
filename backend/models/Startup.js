const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    startupName: { type: String, required: true },
    sector: { type: String, required: true },
    founder: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Startup', startupSchema);
