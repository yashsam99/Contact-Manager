const mongoose = require("mongoose");

// Define the User schema using Mongoose
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "Email address already taken"] // Ensuring uniqueness of email addresses
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }
},
    {
        timestamps: true // Enable timestamps (createdAt, updatedAt)
    });

// Create and export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
