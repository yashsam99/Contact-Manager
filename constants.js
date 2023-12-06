// Exporting an object containing commonly used HTTP status codes as constants
exports.constants = {
    VALIDATION_ERROR: 400, // Bad Request - Used for validation failures
    UNAUTHORIZED: 401, // Unauthorized - Used for authentication failures
    FORBIDDEN: 403, // Forbidden - Used for authorization failures
    NOT_FOUND: 404, // Not Found - Used when a requested resource is not found
    SERVER_ERROR: 500 // Internal Server Error - Used for unexpected server errors
};
