const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try { res.status(201).json(await Contact.create(req.body)); }
    catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
