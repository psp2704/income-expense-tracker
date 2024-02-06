const { appErr } = require("../utils/appErr");
const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/verifyToken");

// Middleware function to check if user is logged in
const isLogin = (req, res, next) => {
    // Extract token from request header
    const token = getTokenFromHeader(req);
    // Verify token
    const decoded = verifyToken(token);
    // Set user ID in request object
    req.user = decoded.id;
    // If token is not valid or expired, return an error response
    if (!decoded) {
        return next(appErr('Token expired, login again', 401));
    }
    // Move to the next middleware or route handler
    next();
};

module.exports = {
    isLogin
};
