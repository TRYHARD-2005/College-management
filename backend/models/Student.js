const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    department: { type: String },
    year: { type: Number },
    email: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model('Student', studentSchema);
