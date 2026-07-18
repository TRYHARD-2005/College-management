const router = require('express').Router();
const Faculty = require('../models/Faculty');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
    try { res.json(await Faculty.find({ isActive: true }).sort({ department: 1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/all', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.json(await Faculty.find().sort({ createdAt: -1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.status(201).json(await Faculty.create(req.body)); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { res.json(await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try { await Faculty.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
