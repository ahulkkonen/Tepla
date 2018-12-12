// Authentication middleware
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Bearer WHITESPACE jwt

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};