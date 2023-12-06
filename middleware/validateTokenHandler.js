const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

/**
 * Middleware to validate the access token in the Authorization header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        // Verify the JWT token
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is Unauthorized");
            }

            // Attach the decoded user information to the request object
            req.user = decoded.user;
            next();
        });
    } else {
        // No Authorization header or doesn't start with "Bearer"
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;
