const JWT = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'User not logged in or token missing'
        });
    }

    try {
        // Verify the token and extract the payload
        const payload = JWT.verify(token, process.env.SECRET);

        // Attach the payload to the request object
        req.user = { id: payload.id, email: payload.email };

    } catch (e) {
        // Check if the error is due to expired token
        if (e instanceof JWT.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Token expired, please log in again'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }

    next();  
};

module.exports = jwtAuth;
