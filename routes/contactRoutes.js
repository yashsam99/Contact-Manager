const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  putContact,
  getContact,
  deleteContact,
} = require("../Controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");

// Apply the validateToken middleware to all routes in this router
router.use(validateToken);

// Define routes for handling contacts
router.route("/")
  .get(getContacts) // Get all contacts
  .post(createContact); // Create a new contact

router.route("/:id")
  .get(getContact) // Get a contact by ID
  .put(putContact) // Update a contact by ID
  .delete(deleteContact); // Delete a contact by ID

// Export the router for use in the application
module.exports = router;
