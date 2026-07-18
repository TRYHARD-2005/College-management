const router = require('express').Router();
const Student = require('../models/Student');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', verifyToken, requireRole('admin', 'faculty'), async (req, res) => {
    try { res.json(await Student.find({ isActive: true }).sort({ department: 1, rollNo: 1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.status(201).json(await Student.create(req.body)); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.json(await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { await Student.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
