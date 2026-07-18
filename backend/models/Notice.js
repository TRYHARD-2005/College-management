const mongoose = require('mongoose');
const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Notice', noticeSchema);
