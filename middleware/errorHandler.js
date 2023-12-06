// Importing necessary constants from a separate file
const { constants } = require('../constants');

/**
 * Error handler middleware to handle different types of errors and send appropriate responses.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Determining the status code from the response or defaulting to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Handling different types of errors and sending appropriate responses
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Bad Request", message: err.message, stackTrace: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "User Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found!", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Internal Server Error", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("No Errors, all good!");
            break;
    }
};

// Exporting the errorHandler middleware to be used in the application
module.exports = errorHandler;
