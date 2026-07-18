const router = require('express').Router();
const Notice = require('../models/Notice');
const { verifyToken, requireRole } = require('../middleware/auth');

// Public: get active notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find({ isActive: true }).sort({ date: -1 });
        res.json(notices);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: get all
router.get('/all', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const notices = await Notice.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: create
router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const notice = await Notice.create(req.body);
        res.status(201).json(notice);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

// Admin: update
router.put('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(notice);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

// Admin: delete
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
