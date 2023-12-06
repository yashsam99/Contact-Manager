const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();

// Establish connection to the MongoDB database
connectDb();

// Middleware to parse JSON requests
app.use(express.json());

// Routes for handling contacts and users
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use(errorHandler);

// Set up the server to listen on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
