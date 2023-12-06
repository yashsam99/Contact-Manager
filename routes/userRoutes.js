const express = require("express");

const router = express.Router();
const { registerUser, currentUser, loginUser } = require("../Controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

// Route for user registration
router.route('/register').post(registerUser);

// Route for user login
router.route('/login').post(loginUser);

// Route for retrieving information about the current user
router.get('/current', validateToken, currentUser);

// Export the router for use in the application
module.exports = router;
