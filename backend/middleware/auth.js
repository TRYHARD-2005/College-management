const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const requireRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user?.role))
        return res.status(403).json({ message: 'Forbidden' });
    next();
};

module.exports = { verifyToken, requireRole };
