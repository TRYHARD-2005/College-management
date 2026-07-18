const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
    rollNo: { type: String }, // for students
    facultyId: { type: String }, // for faculty
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
