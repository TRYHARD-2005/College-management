const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role, ...profileData } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User with this email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        let userDoc = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        if (role === 'student') {
            const existingStudent = await Student.findOne({ rollNo: profileData.rollNo });
            if (existingStudent) return res.status(400).json({ message: 'Student with this Roll No already exists' });

            const newStudent = new Student({
                name,
                email,
                rollNo: profileData.rollNo,
                department: profileData.department,
                year: profileData.year,
                phone: profileData.phone
            });
            await newStudent.save();
            userDoc.rollNo = profileData.rollNo;
        } else if (role === 'faculty') {
            const existingFaculty = await Faculty.findOne({ facultyId: profileData.facultyId });
            if (existingFaculty) return res.status(400).json({ message: 'Faculty with this ID already exists' });

            const newFaculty = new Faculty({
                name,
                email,
                facultyId: profileData.facultyId,
                department: profileData.department,
                designation: profileData.designation,
                phone: profileData.phone
            });
            await newFaculty.save();
            userDoc.facultyId = profileData.facultyId;
        }

        await userDoc.save();

        const token = jwt.sign(
            { id: userDoc._id, role: userDoc.role, name: userDoc.name, email: userDoc.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({ token, user: { id: userDoc._id, name: userDoc.name, email: userDoc.email, role: userDoc.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get current user's profile
router.get('/me', require('../middleware/auth').verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        let profile = user.toObject();

        if (user.role === 'student' && user.rollNo) {
            const studentData = await Student.findOne({ rollNo: user.rollNo });
            if (studentData) {
                profile = { ...profile, ...studentData.toObject() };
            }
        } else if (user.role === 'faculty' && user.facultyId) {
            const facultyData = await Faculty.findOne({ facultyId: user.facultyId });
            if (facultyData) {
                profile = { ...profile, ...facultyData.toObject() };
            }
        }

        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
