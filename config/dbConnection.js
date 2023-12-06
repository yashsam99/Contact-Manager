// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

/**
 * Asynchronous function to connect to the MongoDB database using the provided connection string.
 * This function uses the try-catch block to handle connection errors.
 */
const connectDb = async () => {
    try {
        // Attempting to connect to the MongoDB database using the connection string from the environment variables
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        // Logging a success message if the connection is established
        console.log("Database connected!", connect.connection.host, connect.connection.name);
    } catch (err) {
        // Logging the error and exiting the process with an error code if connection fails
        console.log(err);
        process.exit(1);
    }
}

// Exporting the connectDb function to be used in other modules
module.exports = connectDb;
