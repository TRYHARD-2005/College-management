const router = require('express').Router();
const Admission = require('../models/Admission');
const { verifyToken, requireRole } = require('../middleware/auth');

// Public: submit admission
router.post('/', async (req, res) => {
    try { res.status(201).json(await Admission.create(req.body)); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

// Admin: get all
router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.json(await Admission.find().sort({ createdAt: -1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: update status
router.patch('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.json(await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { await Admission.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
