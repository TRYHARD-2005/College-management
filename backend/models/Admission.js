const mongoose = require('mongoose');
const admissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    dob: { type: Date },
    address: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    remarks: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Admission', admissionSchema);
