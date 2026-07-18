const mongoose = require('mongoose');
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String },
    qualification: { type: String },
    email: { type: String },
    phone: { type: String },
    facultyId: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Faculty', facultySchema);
