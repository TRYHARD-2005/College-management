const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    seats: { type: Number },
    fee: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Course', courseSchema);
