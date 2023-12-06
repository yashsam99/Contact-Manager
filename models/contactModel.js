const mongoose = require("mongoose");

// Define the Contact schema using Mongoose
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // Reference to the User model
    },
    name: {
        type: String,
        required: [true, "Please provide a name for the contact"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email address for the contact"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number for the contact"],
    },
}, {
    timestamps: true // Enable timestamps (createdAt, updatedAt)
});

// Create and export the Contact model based on the schema
module.exports = mongoose.model("Contact", contactSchema);
