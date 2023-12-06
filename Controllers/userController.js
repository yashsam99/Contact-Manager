// Importing necessary libraries and modules
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Controller function to register a new user.
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Checking if required fields are provided
    if (!username || !password || !email) {
        res.status(400);
        throw new Error("All fields are Mandatory!");
    }

    // Checking if the user with the provided email already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User Already registered!");
    }

    // Hashing the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword is: ", hashedPassword);

    // Creating a new user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User Created Successfully ${user}`);
    res.status(201).json({ _id: user.id, email: user.email });
});

/**
 * Controller function to log in a user.
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Checking if required fields are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are Mandatory!");
    }

    // Finding the user with the provided email
    const user = await User.findOne({ email });

    // Comparing the provided password with the hashed password stored in the database
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generating an access token using JWT for the authenticated user
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: "15m"
        });

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid!");
    }
});

/**
 * Controller function to get information about the current user.
 * @route GET /api/users/current
 * @access Private
 */
const currentUser = asyncHandler(async (req, res) => {
    // Returning the information of the authenticated user
    res.json(req.user);
});

// Exporting the controller functions to be used in routes
module.exports = { registerUser, loginUser, currentUser };
