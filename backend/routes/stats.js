const router = require('express').Router();
const Notice = require('../models/Notice');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const Admission = require('../models/Admission');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const [students, faculty, notices, admissions] = await Promise.all([
            Student.countDocuments({ isActive: true }),
            Faculty.countDocuments({ isActive: true }),
            Notice.countDocuments({ isActive: true }),
            Admission.countDocuments({ status: 'pending' }),
        ]);
        res.json({ students, faculty, notices, pendingAdmissions: admissions });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
